import axios from "axios";

let apiUrl;

if (process.env.NODE_ENV === 'development') {
  // Mode pengembangan, gunakan URL lokal
  apiUrl = 'http://localhost:5000';
} else {
  // Mode produksi, gunakan URL produksi (URL di Render)
  apiUrl = process.env.REACT_APP_API_URL;
}

// Fungsi untuk mengambil semua produk
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk mengambil produk berdasarkan ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk membuat produk baru
export const createProduct = async (formData) => {
  try {
    
    const response = await axios.post(`${apiUrl}/api/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk memperbarui produk berdasarkan ID
export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk menghapus produk berdasarkan ID
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
