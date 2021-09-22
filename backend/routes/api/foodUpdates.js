const express = require("express");
const Wastage = require("../../models/FoodMessage");
const auth = require("../../middleware/auth");
const app = express();
// export app @important

function getCurrentDate() {
  var separator = "-";
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

app.get("/", async (req, res) => {
  const adminID = "60719b6be0964b25f0bdf269";
  const data = await Wastage.findOne({ admin: adminID })
    .where("date")
    .equals(getCurrentDate());
  //console.log(data)
  res.send(data);
});

app.post("/", auth, async (req, res) => {
  //   console.log("in req route")
  const adminID = req.adminuser.id;
  const frontendData = req.body;
  const detailsTemp = {};
  //   console.log(frontendData)
  detailsTemp.admin = adminID;
  if (frontendData.message) detailsTemp.message = frontendData.message;
  if (frontendData.wastage) detailsTemp.foodWaste = frontendData.wastage;
  try {
    let profileDetails = await Wastage.findOne({ admin: adminID })
      .where("date")
      .equals(getCurrentDate());
    if (profileDetails) {
      if (frontendData.message) {
        profileDetails = await Wastage.findOneAndUpdate(
          { admin: adminID, date: getCurrentDate() },
          { $set: { message: frontendData.message, date: getCurrentDate() } },
          { new: true }
        );
      } else {
        profileDetails = await Wastage.findOneAndUpdate(
          { admin: adminID, date: getCurrentDate() },
          { $set: { foodWaste: frontendData.wastage, date: getCurrentDate() } },
          { new: true }
        );
      }
      return res.json(profileDetails);
    }

    //create
    detailsTemp.date = getCurrentDate();
    profileDetails = new Wastage(detailsTemp);
    await profileDetails.save();
    res.json(profileDetails);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
