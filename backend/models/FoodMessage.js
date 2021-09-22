// under consideration

// const { Double } = require("bson");
const mongoose = require("mongoose");

const foodwasteSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  foodWaste: {
    type: Number,
    default : 0,
  },
  message:{
      type: String,
      default:"All items are ready! "
  },
  date:{
    type:String,
    default: Date.now
  }
});

module.exports = Wastage = mongoose.model("wastage", foodwasteSchema);
