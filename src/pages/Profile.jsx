import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import "./profile.css"

const Profile = () => {
  const [user, setUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: null,
    name: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil informasi pengguna:", error);
      });
  }, []);

  const handleCancel = () => {
    setShowEditModal(false);
    setEditedUser({
      id: null,
      username: ""
    });
  }

  const handleEdit = (user) => {
    setShowEditModal(true);
    setEditedUser({
      id: user.id,
      username: user.username,
    });
  }

  const handleSave = async () => {
    try {
      const { id, username } = editedUser
      const token = localStorage.getItem("token");
      // Kirim permintaan ke server untuk mengedit profil
      await axios.put(`http://localhost:5000/api/auth/profile/${id}`, {username}, {
        headers: {
          Authorization: token,
        },
      });

      setUser({ ...user, username: username });
      // Tambahkan logika lain yang diperlukan, seperti menutup modal dan menampilkan pesan sukses
      setShowEditModal(false);
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <>
    <UserContext.Provider value={user}>
    <Navbar />
      <div>
        <h2>Profil Pengguna</h2>
        <div className="avatar">
          <img src={user.photo} alt="profile" />
        </div>
        <p>ID: {user.id}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Nama: {user.name}</p>
        <p>Role: {user.role}</p>
        <button onClick={() => handleEdit(user)}>
          Edit Profil
        </button>
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Profil
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="username">Nama Produk:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    name="username"
                    required
                    value={editedUser.username}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        username: e.target.value,
                      })
                    }
                  />
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
    </UserContext.Provider>
    </>
  );
};

export default Profile;
