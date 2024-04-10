const express = require("express");

const {
  createTask,
  getSingleTask,
  updateTask,
  getTasks,
  deleteTask,
} = require("../controller/taskController");

const router = express.Router();

router.route("/tasks").get(getTasks);

router.route("/task/:id").get(getSingleTask);

router.route("/task").post(createTask);

router.route("/task/:id").put(updateTask);

router.route("/task/:id").delete(deleteTask);

module.exports = router;
