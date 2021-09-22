// const bcrypt=require('bcrypt')
// const app = express();

// app.use(express.json());
// app.get("/users", (req, res) => {
//      res.send(users)
// });
// app.post('/users',async (req,res)=>{

//     try{

//         const hashedPassword= await bcrypt.hash(req.body.password,10)
//         const user = { name: req.body.name, password: hashedPassword };
//         users.push(user);
//         res.status(201).send();

//     }
//     catch(err){

//         res.status(500).send(err)
//     }

// })
// app.post('/users/login', async (req,res)=>{

//     const user=users.find(user=>user.name===req.body.name)
//     if(user==null)
//     {
//         res.status(400).send('user not found')
//     }
//     try{
//        if(await bcrypt.compare(req.body.password,user.password))
//        res.status(201).send('Succesfully logged in')
//        else
//        res.status(201).send('Password did not match')
//     }
//     catch(err){
//             res.status(500).send()
//     }
// })
// app.listen(3000, () => {
//   console.log(`listening on port 3000`);
// });

const express = require("express");
const Admin = require("../../models/AdminUser");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/", auth, async (req, res) => {
  try {
    const adminuser = await Admin.findById(req.adminuser.id).select(
      "-password"
    );
    res.json({ adminuser });
  } catch (err) {
    // console.log("Here")
    res.json({ msg: "server error" });
  }
  res.send("Auth route");
});
// autheticate user and get token

app.post(
  "/",
  [
    check("email", "Please enter your mail").isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let adminuser = await Admin.findOne({ email });
      //  console.log(user)
      if (!adminuser) {
        return res.json({ msg: "invalid credentials" });
      }

      const isMatched = await bcrypt.compare(password, adminuser.password);
      if (!isMatched) {
        return res.json({ msg: "invalid credentials" });
      }
      // result=true;
      //  res.status(200).json({isLogged:true})

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
      //  res.redirect('/signup')
      //test1
    } catch (err) {
      console.error(err.message);
      res.send("Server error");
    }
  }
);

module.exports = app;
