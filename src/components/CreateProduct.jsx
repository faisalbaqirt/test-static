import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { createProduct } from "./productAPI"; // Impor createProduct dari productAPI.js

function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("gambar", gambar, gambar.name);

      const response = await createProduct(formData);
      console.log(response);
      setIsLoading(false)
      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setPrice("");
      setGambar(null);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Product</h2>
      {isLoading && (
      <div className="loader-container">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    )}
      <form onSubmit={handleSubmit}>
        <label for="name">Nama Produk:</label>
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

        <label for="description">Deskripsi Produk:</label>
        <input
          type="text"
          id="description"
          className="form-control"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label for="price">Harga Produk:</label>
        <input
          type="text"
          id="price"
          className="form-control"
          name="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <label htmlFor="gambar">Gambar Produk:</label>
        <input
          type="file"
          id="gambar"
          className="form-control"
          name="gambar"
          required
          onChange={(e) => setGambar(e.target.files[0])}
        />
        <br />
        <div>
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
