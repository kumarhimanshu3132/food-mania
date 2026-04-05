import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // Clear admin status on logout
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("isAdmin") === "true" ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 text-warning fw-bold fst-italic"
                    to="/admin"
                  >
                    Admin Panel
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success mx-2" to="/mycart">
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </Link>
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
