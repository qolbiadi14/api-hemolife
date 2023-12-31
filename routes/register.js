// register.js
var express = require("express");
var router = express.Router();
const registerController = require("../controllers/registerController");

// Route to handle user registration
router.post("/", registerController.registerUser);
router.get("/getDarah", registerController.getDarah);

module.exports = router;
