import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState("");

  const fetchMyOrder = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });
    const json = await response.json();
    setorderData(json);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  let lastDate = "";

  return (
    <div
      style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white" }}
    >
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-success fst-italic mb-4">My Order History</h1>
        <hr style={{ borderColor: "#444" }} />

        <div className="row">
          {orderData !== "" && orderData.orderData ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((orderGroup, groupIndex) => {
                const currentOrderDate = orderGroup[0].Order_date;
                let showHeader = false;
                if (currentOrderDate !== lastDate) {
                  showHeader = true;
                  lastDate = currentOrderDate;
                }

                return (
                  <React.Fragment key={groupIndex}>
                    {showHeader && (
                      <div className="w-100 m-auto mt-5 text-warning fw-bold fs-4">
                        {currentOrderDate}
                        <hr style={{ borderColor: "#444" }} />
                      </div>
                    )}

                    {orderGroup.slice(1).map((item, itemIndex) => (
                      <div key={itemIndex} className="col-12 mb-3">
                        <div
                          className="card shadow-sm"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid #333",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="card-body d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="card-title text-success mb-1">
                                {item.name}
                              </h5>
                              <div className="d-flex align-items-center mt-2">
                                <span className="badge bg-secondary me-3">
                                  {item.qty} x {item.size}
                                </span>
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: "0.85rem" }}
                                >
                                  Ordered at:{" "}
                                  <span className="text-info">
                                    {currentOrderDate}
                                  </span>
                                </span>
                              </div>
                            </div>

                            
                            <div className="text-end">
                              <div className="fw-bold fs-4 text-white">
                                ₹{item.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              })
          ) : (
            <div className="text-center w-100 mt-5 text-secondary">
              No orders found.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
