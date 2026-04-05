const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Route to fetch all categories for the dropdown
router.post("/getcategories", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const categoryCollection = db.collection("foodCategory");

    const categories = await categoryCollection.find({}).toArray();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to add a brand new category
router.post("/addcategory", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const categoryCollection = db.collection("foodCategory");

    await categoryCollection.insertOne({
      CategoryName: req.body.CategoryName,
    });

    res.json({ success: true, message: "Category added successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to add a new food item
router.post("/addfood", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const foodCollection = db.collection("food_items");

    const newFood = {
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      img: req.body.img,
      options: [req.body.options],
      description: req.body.description,
    };

    await foodCollection.insertOne(newFood);
    res.json({ success: true, message: "Dish added successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
