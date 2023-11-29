var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Login } = require("../models");
const { authenticateToken } = require("../middleware/middleware");


router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email);

    const user = await Login.findOne({ where: { email } });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password
    );

    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
