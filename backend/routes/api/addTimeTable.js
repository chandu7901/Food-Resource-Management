const express = require("express");
const auth = require("../../middleware/auth");
const Menu = require("../../models/Menu");
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
  const data = await Menu.findOne({ admin: adminID })
    .where("date")
    .equals(getCurrentDate());
  //console.log(data)
  res.send(data);
}); //get your data in frontend

app.post("/", auth, async (req, res) => {
  // function getCurrentDate() {
  //     var separator = "-";
  //     let newDate = new Date();
  //     let date = newDate.getDate();
  //     let month = newDate.getMonth() + 1;
  //     let year = newDate.getFullYear();
  //     return `${date}${separator}${
  //       month < 10 ? `0${month}` : `${month}`
  //     }${separator}${year}`;
  //   }
  // console.log(req.adminuser.id) // req has adminid jwt
  //    console.log(req)
  const adminID = req.adminuser.id;
  const { lunchList, dinnerList, foodcooked, date } = req.body; //  message
  const menuLocal = {};
  menuLocal.admin = adminID;
  if (lunchList && dinnerList) {
    menuLocal.lunchList = lunchList;
    menuLocal.dinnerList = dinnerList;
    menuLocal.foodCooked = foodcooked;
  }
  try {
    let profileMenu = await Menu.findOne({ admin: adminID })
      .where("date")
      .equals(getCurrentDate());
    if (profileMenu) {
      //  console.log("In update")
      profileMenu = await Menu.findOneAndUpdate(
        { admin: adminID, date: getCurrentDate() },
        { $set: menuLocal },
        { new: true }
      );

      return res.json(profileMenu);
    }

    //create
    //    console.log(profileMenu)
    menuLocal.date = date;
    profileMenu = new Menu(menuLocal);
    await profileMenu.save();
    res.json(profileMenu);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
