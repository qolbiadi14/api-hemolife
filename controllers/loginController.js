// loginController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Login, Admin } = require("../models");

// Controller function for user and admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt with email:", email);

    // Find user and admin with the given email
    const user = await Login.findOne({ where: { email } });
    const admin = await Admin.findOne({ where: { email } });

    // If no user or admin is found, send an error response
    if (!user && !admin) {
      console.log("User or admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If user is found, check user password
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        password.trim(),
        user.password
      );
      console.log("User password comparison result:", isPasswordValid);

      if (isPasswordValid) {
        const token = jwt.sign(
          { userId: user.id_user },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return res.json({ message: "User login successful", token });
      }
    }

    // If admin is found, check admin password
    if (admin) {
      const isPasswordValid = password.trim() === admin.password;
      console.log("Admin password comparison result:", isPasswordValid);

      if (isPasswordValid) {
        const token = jwt.sign(
          { adminId: admin.id_admin },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return res.json({ message: "Admin login successful", token });
      }
    }

    // If password is not valid, send an error response
    console.log("Invalid password");
    return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
