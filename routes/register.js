var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { nanoid } = require("nanoid");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    phoneNumber: "The phone number must be started with '0'!",
  },
});

router.post("/", async (req, res) => {
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

    // Mengirim pesan "Data tersimpan" beserta data yang diinputkan
    res.json({ message: "Data tersimpan", user });
  } catch (error) {
    // Tangani kesalahan khusus untuk email
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.errors.some((e) => e.path === "email")
    ) {
      return res
        .status(400)
        .json({
          message: "Email sudah terdaftar, silakan gunakan email lain.",
        });
    }

    // Tangani kesalahan khusus untuk no_hp
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.errors.some((e) => e.path === "no_hp")
    ) {
      return res
        .status(400)
        .json({
          message: "Nomor HP sudah terdaftar, silakan gunakan nomor HP lain.",
        });
    }

    // Tangani kesalahan umum
    console.error("Error during user creation:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menyimpan data." });
  }
});

module.exports = router;
