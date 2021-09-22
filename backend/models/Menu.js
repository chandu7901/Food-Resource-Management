const { Double } = require('bson');
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  lunchList: [
    {
      type: String,
      required: true
    },
  ],
  dinnerList: [
    {
      type: String,
      required: true
    },
  ],
  
foodCooked:{

  type : Number,
    required : true

},
  date: {
    type: "String",
    default: Date.now,
  },
});

module.exports = Menu = mongoose.model("menu", menuSchema);
