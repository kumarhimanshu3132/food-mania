require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully!");
        
       const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
       // console.log(global.food_items);
       const foodCategory_data = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory_data;
        
    } catch (error) {
        console.log("--- Error connecting to MongoDB ---", error);
    }
};

module.exports = mongoDB;