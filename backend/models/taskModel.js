const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  taskname: String,
  taskdate: String,
  starttime: String,
  endtime: String,
  description: String,
  checked: { type: Boolean, default: false },
});

const taskModel = mongoose.model("Task", TaskSchema);
module.exports = taskModel;
