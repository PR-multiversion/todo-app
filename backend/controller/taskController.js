const taskModel = require("../models/taskModel");

exports.getTasks = async (req, res, next) => {
  const tasks = await taskModel.find({});
  res.status(200).send(tasks);
};

exports.getSingleTask = async (req, res, next) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).send("No data found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unable to find the task with this id",
    });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskModel.create(req.body);
    res.json({
      success: true,
      task,
      message: "task created!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unable to create the task",
    });
  }
};
exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      task,
      message: "task updated!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unable to find the task with this id",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id, req.body);
    res.json({
      success: true,
      task,
      message: "task deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unable to find the task with this id",
    });
  }
};
