import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function Admin() {
  // State for the new dish form
  const [food, setFood] = useState({
    name: "",
    CategoryName: "",
    img: "",
    description: "",
    price: "",
  });

  // State to hold categories from the database
  const [categories, setCategories] = useState([]);

  // State for the new category input box
  const [newCategory, setNewCategory] = useState("");

  // Function to fetch existing categories from backend
  const loadCategories = async () => {
    let response = await fetch(
      "https://food-mania-6a4q.onrender.com/api/getcategories",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );
    response = await response.json();
    if (response.success) {
      setCategories(response.data);
    }
  };

  // Call loadCategories automatically when the page loads
  useEffect(() => {
    loadCategories();
  }, []);

  // Function to handle adding a Food Item
  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://food-mania-6a4q.onrender.com/api/addfood",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: food.name,
          CategoryName: food.CategoryName,
          img: food.img,
          description: food.description,
          // Automatically creating the options object for half/full
          options: {
            half: food.price,
            full: (parseInt(food.price) * 1.5).toString(),
          },
        }),
      },
    );
    const json = await response.json();
    if (json.success) {
      toast.success(`${food.name} Added to Menu!`);
      setFood({
        name: "",
        CategoryName: "",
        img: "",
        description: "",
        price: "",
      }); // clear form
    } else {
      toast.error("Failed to add dish.");
    }
  };

  // Function to handle adding a new Category
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://food-mania-6a4q.onrender.com/api/addcategory",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CategoryName: newCategory }),
      },
    );
    const json = await response.json();
    if (json.success) {
      toast.success(`Category "${newCategory}" created!`);
      setNewCategory(""); // clear input box
      loadCategories(); // Instantly refresh the dropdown list!
    } else {
      toast.error("Failed to add category.");
    }
  };

  const onChangeFood = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "white" }}
    >
      <Navbar />

      <div className="container mt-5 mb-5">
        <h1 className="text-success fst-italic mb-4">Admin Dashboard</h1>
        <hr style={{ borderColor: "#444" }} />

        <div className="row">
          {/* LEFT COLUMN: Add New Category */}
          <div className="col-md-4 mb-4">
            <div
              className="card shadow-lg p-4"
              style={{
                backgroundColor: "#212529",
                color: "white",
                border: "1px solid #333",
                borderRadius: "15px",
              }}
            >
              <h4 className="mb-3 text-info">Add Category</h4>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                    placeholder=""
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-info w-100 fw-bold shadow-lg text-dark"
                >
                  +Create Category
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Add New Dish */}
          <div className="col-md-8">
            <div
              className="card shadow-lg p-4"
              style={{
                backgroundColor: "#212529",
                color: "white",
                border: "1px solid #333",
                borderRadius: "15px",
              }}
            >
              <h3 className="mb-4 text-warning">Add New Dish</h3>
              <form onSubmit={handleFoodSubmit}>
                <div className="mb-3">
                  <label className="form-label text-secondary">Dish Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={food.name}
                    onChange={onChangeFood}
                    required
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                    placeholder=""
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Category</label>
                  <select
                    className="form-control"
                    name="CategoryName"
                    value={food.CategoryName}
                    onChange={onChangeFood}
                    required
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                  >
                    <option value="">Select a Category...</option>

                    {/* This dynamically maps over whatever is in your database */}
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.CategoryName}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="img"
                    value={food.img}
                    onChange={onChangeFood}
                    required
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                    placeholder=""
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={food.description}
                    onChange={onChangeFood}
                    required
                    rows="2"
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                    placeholder=""
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary">
                    Base Price (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={food.price}
                    onChange={onChangeFood}
                    required
                    style={{
                      backgroundColor: "#2d3238",
                      color: "white",
                      border: "none",
                    }}
                    placeholder=""
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 fs-5 fw-bold shadow-lg"
                >
                  +Add to Menu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
