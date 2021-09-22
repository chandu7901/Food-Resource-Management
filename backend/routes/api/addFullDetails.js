const express = require("express");
const Details = require("../../models/Admindetails");
const auth = require("../../middleware/auth");
const app = express();
// export app @important

app.get("/", async (req, res) => {

    const adminID='60719b6be0964b25f0bdf269';
    const data= await Details.findOne({admin:adminID})
    // console.log(data)
    res.send(data)

});

app.post("/", auth, async (req, res) => {
  // console.log(req.body)
  const adminID = req.adminuser.id;
  const { serviceName, totalConsumers } = req.body;
  const detailsTemp = {};
  detailsTemp.admin = adminID;
  if (serviceName) detailsTemp.messName = serviceName;
  if (totalConsumers) detailsTemp.totalRegistered = totalConsumers;
  try {
    let profileDetails = await Details.findOne({ admin: adminID });
    if (profileDetails) {
      //  console.log("In update")
      profileDetails = await Details.findOneAndUpdate(
        { admin: adminID },
        { $set: detailsTemp },
        { new: true }
      );

      return res.json(profileDetails);
    }

    //create

    profileDetails = new Details(detailsTemp);
    await profileDetails.save();
    res.json(profileDetails);
  } catch (err) {
    res.send(err);
  }

});

module.exports = app;
