const Task = require("../models/Task");
const { getIO } = require("../config/socket");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });

    const io = getIO();
    io.emit("taskCreated", task);

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = { title: new RegExp(search, "i") };

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const count = await Task.countDocuments(query);

    res.status(200).json({ success: true, data: tasks, total: count });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const io = getIO();
    io.emit("taskUpdated", task);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const io = getIO();
    io.emit("taskDeleted", req.params.id);

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
