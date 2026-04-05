import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://food-mania-6a4q.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleCategory = (categoryName) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(
        expandedCategories.filter((cat) => cat !== categoryName),
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{
                  filter: "brightness(40%)",
                  height: "500px",
                  objectFit: "cover",
                }}
                alt="Delicious Veg Pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{
                  filter: "brightness(40%)",
                  height: "500px",
                  objectFit: "cover",
                }}
                alt="Indian Veg Curry"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{
                  filter: "brightness(40%)",
                  height: "500px",
                  objectFit: "cover",
                }}
                alt="Premium Sweets"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div
        className="sticky-top bg-dark py-3 shadow-lg"
        style={{ zIndex: "1020", borderBottom: "1px solid #333" }}
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <input
            className="form-control me-md-4 mb-3 mb-md-0 shadow-sm"
            type="search"
            placeholder="Search your cravings..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "500px", borderRadius: "20px" }}
          />

          <div className="btn-group shadow-sm" role="group">
            <button
              type="button"
              className={`btn ${typeFilter === "All" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setTypeFilter("All")}
            >
              All Items
            </button>
            <button
              type="button"
              className={`btn ${typeFilter === "Veg" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setTypeFilter("Veg")}
            >
              Pure Veg 🟩
            </button>
            <button
              type="button"
              className={`btn ${typeFilter === "Non-Veg" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setTypeFilter("Non-Veg")}
            >
              Non-Veg 🟥
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {foodCat.length !== 0
          ? foodCat.map((data) => {
              // 3. Pehle hum saare items filter kar lete hain
              const filteredItems = foodItem.filter((item) => {
                const matchCategory = item.CategoryName === data.CategoryName;
                const matchSearch = item.name
                  .toLowerCase()
                  .includes(search.toLowerCase());

                const isNonVeg =
                  item.name.toLowerCase().includes("chicken") ||
                  item.name.toLowerCase().includes("fish") ||
                  item.name.toLowerCase().includes("prawn") ||
                  item.name.toLowerCase().includes("mutton");

                const itemType = isNonVeg ? "Non-Veg" : "Veg";
                const matchType =
                  typeFilter === "All" || typeFilter === itemType;

                return matchCategory && matchSearch && matchType;
              });

              const isExpanded = expandedCategories.includes(data.CategoryName);

              const itemsToDisplay = isExpanded
                ? filteredItems
                : filteredItems.slice(0, 4);

              return (
                <div className="row mb-3" key={data._id}>
                  {/* Category Name aur View All button ko ek line mein laane ke liye flexbox */}
                  <div className="d-flex justify-content-between align-items-center m-3">
                    <div className="fs-3">{data.CategoryName}</div>

                    {filteredItems.length > 4 && (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => toggleCategory(data.CategoryName)}
                      >
                        {isExpanded ? "Show Less" : "View All"}
                      </button>
                    )}
                  </div>
                  <hr />

                  {itemsToDisplay.length !== 0 ? (
                    itemsToDisplay.map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div> No such data found </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
