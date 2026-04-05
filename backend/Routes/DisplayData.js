const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/fooddata", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    const fetched_data = await db.collection("food_items").find({}).toArray();
    const fetched_category = await db.collection("foodCategory").find({}).sort({ _id: 1 }).toArray();
      
    res.send([fetched_data, fetched_category]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
