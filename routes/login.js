var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Login, Admin } = require("../models");
const { authenticateToken } = require("../middleware/middleware");

router.post("/", async (req, res) => {
	const { email, password } = req.body;

	try {
		console.log("Login attempt with email:", email);

		// Cari user dan admin dengan email yang diberikan
		const user = await Login.findOne({ where: { email } });
		const admin = await Admin.findOne({ where: { email } });

		// Jika tidak ada user atau admin yang ditemukan, kirim respons error
		if (!user && !admin) {
			console.log("User or admin not found");
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Jika user ditemukan, periksa password user
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

		// Jika admin ditemukan, periksa password admin
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

		// Jika password tidak valid, kirim respons error
		console.log("Invalid password");
		return res.status(401).json({ message: "Invalid password" });
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
