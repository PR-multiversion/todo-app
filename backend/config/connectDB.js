const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => console.log("Error connecting to MongoDB: " + err));
};

module.exports = connectDatabase;
