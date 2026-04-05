import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://food-mania-6a4q.onrender.com/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      },
    );
    const json = await response.json();

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);

      localStorage.setItem("isAdmin", json.isAdmin);

      navigate("/");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&fit=crop")',
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div
          className="card p-5 shadow-lg text-white"
          style={{
            width: "28rem",
            backgroundColor: "rgba(33, 37, 41, 0.85)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
          }}
        >
          <h2 className="text-center mb-4 fs-1 fst-italic text-success">
            GoFood
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fs-5">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="Enter your email"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="form-label fs-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter your password"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
            </div>

            <div className="d-grid gap-3">
              <button type="submit" className="btn btn-success fw-bold fs-5">
                Login
              </button>
              <Link to="/createuser" className="btn btn-outline-danger fw-bold">
                New user? Sign Up
              </Link>
              <Link
                to="/"
                className="text-center text-white text-decoration-none mt-2 shadow-none"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
