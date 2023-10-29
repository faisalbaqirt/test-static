import { Link } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Navbar() {
  const user = useContext(UserContext);
  const isAuthenticated = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = '/login'
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/test/order" className="nav-link">
                Order
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/test/products" className="nav-link">
                Products
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {user.username}
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/Register" className="nav-link">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
