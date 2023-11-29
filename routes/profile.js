var express = require("express");
var router = express.Router();

const Validator = require("fastest-validator");
const { User } = require("../models");
const { authenticateToken } = require("../middleware/middleware");

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    phoneNumber: "The phone number must be started with '0'!",
  },
});

// Define a route to get the user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Retrieve the user information from the database using the user ID stored in the token
    const user = await User.findOne({ where: { id_user: req.user.userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile
    res.json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update", authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id_user: req.user.userId } });
    
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const schema = {
          nama: "string",
          email: "email",
          alamat: "string",
          jenis_kelamin: "string",
          tanggal_lahir: {
            type: "date",
            convert: true,
          },
          id_gol_darah: "string",
          no_hp: {
            type: "string",
            max: 13,
            custom: (v, errors) => {
              if (typeof v !== "string" || !v.startsWith("0")) {
                errors.push({ type: "phoneNumber" });
                return false; // Return false to indicate validation failure
              }
              return v.replace(/[^\d+]/g, ""); // Sanitize: remove all special chars except numbers
            },
          },
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
          return res.status(400).json(validate);
        }
    
        await User.update(req.body, { where: { id_user: req.user.userId } });
    
        res.json({ message: "User profile updated successfully" });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
