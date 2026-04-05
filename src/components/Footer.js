import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        {/* Left Side: Copyright and Location */}
        <div className="col-md-4 d-flex align-items-center ms-3">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          </Link>
          <span className="text-muted">
            © 2026 <b>GoFood</b>, Inc. Built with ❤️ in <b>Rajkot</b>
          </span>
        </div>

        {/* Right Side: Contact Details */}
        <div className="col-md-4 d-flex flex-column align-items-end me-3 text-end">
          <h5 className="text-success mb-1 fst-italic">Contact Us</h5>
          <p className="mb-0 small text-muted">Email: support@gofood.com</p>
          <p className="mb-0 small text-muted">Phone: +91 98765-43210</p>
          <p className="mb-0 small text-muted">Marwadi University, Rajkot, Gujarat</p>
        </div>
      </footer>
    </div>
  );
}