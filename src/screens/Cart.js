import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      toast.success("Order Placed Successfully! 🎉");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div
      style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white" }}
    >
      <Navbar />

      <div className="container m-auto mt-5">
        {data.length === 0 ? (
          <div className="m-5 w-100 text-center fs-3 text-white">
            The Cart is Empty! Add some delicious food.
          </div>
        ) : (
          <>
            <h1 className="text-success fst-italic mb-4">Your Cart</h1>
            <hr style={{ borderColor: "#444" }} />

            <div className="row">
              {data.map((food, index) => (
                <div key={index} className="col-12 mb-3">
                  <div
                    className="card shadow"
                    style={{
                      backgroundColor: "#212529",
                      color: "white",
                      border: "1px solid #333",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center">
                     
                      <div className="d-flex align-items-center">
                        
                        {food.img && (
                          <img
                            src={food.img}
                            alt={food.name}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginRight: "20px",
                            }}
                          />
                        )}
                        <div>
                          <h5 className="card-title text-success mb-1">
                            {food.name}
                          </h5>
                          <span className="badge bg-secondary me-2">
                            {food.qty} x {food.size}
                          </span>
                          <span
                            className="text-info"
                            style={{ fontSize: "0.9rem" }}
                          >
                            Price: ₹{food.price}/-
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3 rounded mb-5"
              style={{ backgroundColor: "#212529", border: "1px solid #333" }}
            >
              <h2 className="text-white">
                Total Amount:{" "}
                <span className="text-success">₹{totalPrice}/-</span>
              </h2>
              <button
                className="btn btn-success btn-lg mt-3 w-100 shadow-lg"
                onClick={handleCheckOut}
              >
                Confirm Order & Check Out
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
