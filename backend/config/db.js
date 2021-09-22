const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongouri");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI || db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Data base connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
