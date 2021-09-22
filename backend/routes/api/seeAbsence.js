
const express = require("express");
const Admin=require('../../models/AdminUser')
const config = require('config')
const auth=require('../../middleware/auth')
const Menu=require('../../models/Menu')
const app = express();
// export app @important
app.post('/',auth, async (req,res)=>{

  res.send("In see absence route");



})

module.exports=app; 