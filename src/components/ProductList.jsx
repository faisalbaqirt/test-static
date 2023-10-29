import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productAPI";

function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Status apakah sedang dalam mode edit
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    gambar: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData.data);
      console.log("Data dari API:", productsData.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditedProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      gambar: null, // Atau gambar yang ingin Anda tampilkan di modal
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const { id, name, description, price, gambar } = editedProduct;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("gambar", gambar);

      if (isEditing) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }

      setIsLoading(false);
      setIsEditing(false);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Keluar dari mode edit
    setShowModal(false);
    setEditedProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      gambar: null,
    });
  };
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      // Refresh daftar produk setelah berhasil menghapus
      setProducts((prevProducts) =>
        prevProducts.filter((prevProduct) => prevProduct.id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" id="productlist" >
      <div className="content-title text-center">
      <h2 >Daftar Produk</h2>
      </div>
      {isLoading && (
        <div className="loader-container">
          <Oval
            height={80}
            width={80}
            color="#fff"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <div className="content-head">
      <button className="btn btn-primary" onClick={handleCreate}>
        Add
      </button>
      </div>
      <div className="product-table">
      <div className="row">
        {products.map((product) => {
          return (
            <div className="product-card col-md-3 col-sm-12" key={product.id}>
              <div className="card" style={{ position: "relative" }}>
                <div
                  className="dropdown dropdown-hidden"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    zIndex: 1,
                  }}
                >
                  <button
                    className="btn drop-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-header">
                  <img
                    src={product.gambar}
                    className="card-img-top"
                    alt={product.name}
                  />
                </div>
                <div className="card-body text-uppercase">
                  <p className="card-title">{product.name}</p>
                  <p className="card-text">{product.description}</p>
                  <p className="card-price">
                    Harga:{" "}
                    {Math.floor(product.price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Produk" : "Tambah Produk"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="name">Nama Produk:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    required
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <br />

                  <label htmlFor="description">Deskripsi Produk:</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    name="description"
                    required
                    value={editedProduct.description}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  <br />

                  <label htmlFor="price">Harga Produk:</label>
                  <input
                    type="text"
                    id="price"
                    className="form-control"
                    name="price"
                    required
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <br />

                  <label htmlFor="gambar">Gambar Produk:</label>
                  <input
                    type="file"
                    id="gambar"
                    className="form-control"
                    name="gambar"
                    required
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        gambar: e.target.files[0],
                      })
                    }
                  />
                  <br />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
