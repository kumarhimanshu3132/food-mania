const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "My name is Himanshu and I am a MERN stack developer";

router.post(
  "/createuser",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("name", "Name must contain at least 2 characters").isLength({
      min: 2,
    }),
    body("password", "Password must contain at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error creating user" });
    }
  },
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must contain at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Enter valid credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password,
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Enter valid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      
      return res.json({
        success: true,
        authToken: authToken,
        isAdmin: userData.isAdmin, 
        message: "User logged in successfully",
      });
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error logging in" });
    }
  },
);

module.exports = router;