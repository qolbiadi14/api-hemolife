var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

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
    tanggal_lahir: "date",
    id_gol_darah: "string",
    no_hp: {
      type: "string",
      length: 15,
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

  // Continue with the rest of the route logic if validation passes
  // ...
});

module.exports = router;
