const express = require("express");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Responses = require("../../models/Responses");
const UserProf = require("../../models/Userprofile");
const jwt = require("jsonwebtoken");
const app = express();

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
  let curDate = getCurrentDate();
  const responsesLunch = await Responses.find({ date: curDate })
    .where("absentL")
    .equals(false)
    .countDocuments();
  const responsesDinner = await Responses.find({ date: curDate })
    .where("absentD")
    .equals(false)
    .countDocuments();
  // const userL= await Responses.find({user:tok.})
  // const finalRes=await Responses.find({date:curDate,user})
  // console.log(tok.user.id)
  res.send({ responsesLunch, responsesDinner });
  // console.log(responsesLunch);
});
app.post("/", auth, async (req, res) => {
  const { lunch, dinner, date } = req.body;

  try {
    let resp = {};
    resp.user = req.user.id;
    resp.absentL = lunch;
    resp.absentD = dinner;
    resp.date = date;

    if (!lunch || !dinner) {
      try {
        let month = new Date().getMonth() + 1;
        let userFind = await UserProf.findOne({ user: req.user.id })
          .where("month")
          .equals(month);

        if (userFind) {
          let prevValue = await UserProf.findOne({ user: req.user.id });
          userFind = await UserProf.findOneAndUpdate(
            { user: req.user.id },
            { $set: { contributions: prevValue.contributions + 1 } },
            { new: true }
          );
        } else {
          let dataMain = {};
          let curmonth = new Date().getMonth() + 1;
          dataMain.user = req.user.id;
          dataMain.contributions = 1;
          dataMain.month = curmonth;
          const newResp = new UserProf(dataMain);
          await newResp.save();
        }
      } catch (err) {
        console.log(err);
      }
    }

    let findUser = await Responses.findOne({ user: req.user.id })
      .where("date")
      .equals(getCurrentDate());
    if (findUser) {
      findUser = await Responses.findOneAndUpdate(
        { user: req.user.id, date: date },
        {
          $set: {
            absentD: dinner,
            absentL: lunch,
          },
        },
        { new: true }
      );
      // findOneandupdate saves to db automatically
    } else {
      // console.log("Hello ");
      const responseFinal = new Responses(resp);
      await responseFinal.save();
    }

    res.json(resp);
  } catch (error) {
    res.send("server error");
  }
});

module.exports = app;
