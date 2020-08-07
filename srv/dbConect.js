require("dotenv").config();
const mongoose = require("mongoose");

const constant = require("../constants/constants");

const CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.njnup.mongodb.net/${constant.DATABASE_NAME}`;

async function contactDatabase() {
  try {
    await mongoose.connect(CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info("Database connection successful");
  } catch (error) {
    console.log("No connect Database");
    process.exit(1);
  }
}

module.exports = contactDatabase;
