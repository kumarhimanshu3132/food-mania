import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    );
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      alert("Account created successfully, Please Login Now");
      navigate("/login"); 
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
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
        }}
      >
        <div
          className="card p-4 shadow-lg text-white"
          style={{
            width: "30rem",
            backgroundColor: "rgba(33, 37, 41, 0.85)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
          }}
        >
          <h2 className="text-center mb-4 fs-1 fst-italic text-success">
            GoFood
          </h2>
          <h5 className="text-center mb-4 text-secondary">
            Create your account
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter your full name"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="email@example.com"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
              <div
                className="form-text text-secondary mt-1"
                style={{ fontSize: "0.8rem" }}
              >
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Create a strong password"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
                placeholder="Enter your city/area"
                style={{
                  backgroundColor: "#2d3238",
                  color: "white",
                  border: "none",
                }}
              />
            </div>
            <div className="d-grid gap-3">
              <button type="submit" className="btn btn-success fw-bold fs-5">
                Sign Up
              </button>
              <Link to="/login" className="btn btn-outline-danger fw-bold">
                Already a user? Login
              </Link>

              <Link
                to="/"
                className="text-center text-white text-decoration-none mt-1"
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
