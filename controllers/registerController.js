// registerController.js
const { nanoid } = require("nanoid");
const { User, GolDarah } = require("../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    phoneNumber: "The phone number must be started with '0'!",
  },
});

// Controller function for user registration
exports.registerUser = async (req, res) => {
  const schema = {
    nama: "string",
    email: "email",
    password: "string|min:6",
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

  try {
    req.body.id_user = nanoid();
    req.body.password = await bcrypt.hash(req.body.password, 10); // Hash the password before saving
    const user = await User.create(req.body);

    // Send a response with "Data tersimpan" message along with the input data
    res.json({ message: "Data tersimpan", user });
  } catch (error) {
    // Handle specific errors for email
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.errors.some((e) => e.path === "email")
    ) {
      return res.status(400).json({
        message: "Email sudah terdaftar, silakan gunakan email lain.",
      });
    }

    // Handle specific errors for no_hp
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.errors.some((e) => e.path === "no_hp")
    ) {
      return res.status(400).json({
        message: "Nomor HP sudah terdaftar, silakan gunakan nomor HP lain.",
      });
    }

    // Handle general errors
    console.error("Error during user creation:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data." });
  }
};

exports.getDarah = async (req, res) => {
  try {
    const golDarah = await GolDarah.findAll({
    });

    // Send the jadwal data as a response
    res.json({ success: true, data: golDarah });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};