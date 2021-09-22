const express = require("express");
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/AdminUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const app = express();
// registration
app.get("/", async (req, res) => {
  let admins = await Admin.find({});
  res.send(admins);
});
app.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "min length of 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let adminuser = await Admin.findOne({ email });
      if (adminuser) {
        return res.json({ errors: [{ msg: "user already exists" }] });
      }
      adminuser = new Admin({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(6);
      adminuser.password = await bcrypt.hash(password, salt);
      await adminuser.save();
      const payload = {
        adminuser: {
          id: adminuser.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.send("Server error");
    }
  }
);
module.exports = app;
