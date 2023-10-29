// fetch API order
import axios from 'axios';

let apiUrl;

if (process.env.NODE_ENV === 'development') {
  // Mode pengembangan, gunakan URL lokal
  apiUrl = 'http://localhost:5000';
} else {
  // Mode produksi, gunakan URL produksi (URL di Render)
  apiUrl = process.env.REACT_APP_API_URL;
}


// Mengambil semua order berdasarkan bulan dan tahun
export const getOrdersByMonth = async (year, month) => {
  try {
    const response = await axios.get(`${apiUrl}/api/admin/orders-chart/${year}/${month}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSalesByMonth = async (year, month) => {
  try {
    const response = await axios.get(`${apiUrl}/api/admin/sales-chart/${year}/${month}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// mengambil semua order
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// mengambil order berdasarkan ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// membuat order
export const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/orders`, orderData);
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Gagal membuat pesanan.');
      }
    } catch (error) {
      throw error;
    }
  };
  
// mengupdate order berdasarkan ID
export const updateOrder = async (orderId, updatedData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/orders/${orderId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.put(`${apiUrl}/api/orders/status/${orderId}`, newStatus);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// menghapus order berdasarkan ID
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};