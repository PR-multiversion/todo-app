const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config", ".env") });

const connectDatabase = require("./config/connectDB");

const cors = require("cors");
const task = require("./router/task");

app.use(cors());
app.use(express.json());
app.use("/todo/api/", task);

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
