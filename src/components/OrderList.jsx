import React, { useState, useEffect } from "react";
import {
  getAllOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../utils/orderAPI";
import { capitalize } from "lodash";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [product_name, setProductName] = useState("paket ayam geprek");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getAllOrders();
      setOrders(ordersData.data);
      console.log("Data from API:", ordersData.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectOrder = (e, orderId) => {
    if (e.target.checked) {
      setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const handleAddOrder = () => {
    setShowOrderForm(true);
  };

  const handleCreateOrder = async () => {
    // Kirim permintaan HTTP untuk membuat pesanan
    try {
      try {
        const orderData = {
          product_name,
          quantity,
          name,
          telephone,
          address,
        };

        const response = await createOrder(orderData);
        console.log(response.order_id.id);

        setShowOrderForm(false);
        fetchOrders(); // Tutup modal setelah pesanan dibuat
      } catch (error) {
        console.error("Error:", error);
      }

      // Perbarui daftar pesanan setelah penambahan
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat pesanan:", error);
    }
  };

  const handleCancelOrder = () => {
    setShowOrderForm(false); // Tutup modal tanpa membuat pesanan baru
  };

  const handleStatusChange = async (orderId) => {
    try {
      // Kirim permintaan HTTP untuk mengubah status pesanan
      const updatedStatus = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status:
                order.status === "Belum Bayar"
                  ? "Sudah Dibayar"
                  : "Belum Bayar",
            }
          : order
      );
      setOrders(updatedStatus);

      // Kirim permintaan HTTP ke server untuk mengubah status pesanan
      await updateOrderStatus(orderId, {
        newStatus: updatedStatus.find((order) => order.id === orderId).status,
      });

      console.log("Status pesanan berhasil diubah");
    } catch (error) {
      console.error("Terjadi kesalahan saat mengubah status pesanan:", error);
    }
  };

  const handleDeleteSelectedOrders = async () => {
    console.log("Pesanan yang dipilih:", selectedOrders);

    try {
      // Kirim permintaan HTTP untuk menghapus pesanan dari database
      await Promise.all(selectedOrders.map((orderId) => deleteOrder(orderId)));

      console.log("Pesanan yang dipilih berhasil dihapus");
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus pesanan:", error);
    }

    // Setelah penghapusan berhasil, reset state dan perbarui daftar pesanan
    setSelectedOrders([]);
    fetchOrders();
  };

  const isDeleteVisible = selectedOrders.length > 0;
  const selectedCount = selectedOrders.length;

  return (
    <>
      <div className="container" id="orderlist">
        <div className="content-title text-center">
          <h2> Order List</h2>
        </div>

        <div className="content-head">
          <button
            className="btn btn-primary"
            onClick={handleAddOrder}
            style={{ margin: "0 20px" }}
          >
            Add
          </button>
        </div>
        {isDeleteVisible && (
          <div className="select-visible">
            <button
              type="button"
              className="btn-close"
              onClick={(e) => setSelectedOrders([])}
            >
           
            </button>

            <p style={{color: "black"}}>{selectedCount} selected</p>

            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleDeleteSelectedOrders}
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        )}

        <div className="table-container">
          <table className="table text-center">
            <thead>
              <tr class="table-dark">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedOrders(orders.map((order) => order.id))
                        : setSelectedOrders([])
                    }
                  />
                </td>
                <td>Nomor Pesanan</td>
                <td>Tanggal Pesanan</td>
                <td>Nama Pelanggan</td>
                <td>Nama Produk</td>
                <td>Jumlah Produk</td>
                <td>Total Harga</td>
                <td>Nomor Telepon</td>
                <td>Alamat</td>
                <td>Status</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td> 
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => handleSelectOrder(e, order.id)}
                    />
                  </td>
                  <td >{order.id}</td>
                  <td>{order.created_at}</td>
                  <td>{capitalize(order.name)}</td>
                  <td>{capitalize(order.product_name)}</td>
                  <td>{Math.floor(order.quantity)}</td>
                  <td>
                    {Math.floor(order.total_amount).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td>{order.telephone}</td>
                  <td>{capitalize(order.address)}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status === "Belum Bayar" && (
                      <button onClick={() => handleStatusChange(order.id)}>
                        Tandai Bayar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showOrderForm && (
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah Pesanan</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCancelOrder}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label for="product_name">Nama Produk:</label>
                    <select
                      id="product_name"
                      className="form-control"
                      name="product_name"
                      required
                      value={product_name}
                      onChange={(e) => setProductName(e.target.value)}
                    >
                      <option value="paket ayam geprek">
                        Paket Ayam Geprek
                      </option>
                      <option value="ayam geprek">Ayam Geprek</option>
                    </select>
                    <br />

                    <label for="quantity">Jumlah:</label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      name="quantity"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <br />

                    <label for="name">Nama Pemesan:</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />

                    <label for="telephone">Telepon:</label>
                    <input
                      type="text"
                      id="telephone"
                      className="form-control"
                      name="telephone"
                      required
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                    <br />

                    <label for="address">Alamat:</label>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      name="address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <br />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelOrder}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreateOrder}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
