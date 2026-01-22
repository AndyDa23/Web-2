const tasksService = require("../services/tasksService");

exports.getAll = (req, res) => {
  res.json(tasksService.getAll());
};

exports.getById = (req, res) => {
  const task = tasksService.getById(Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.create = (req, res) => {
  const { title, description, userId } = req.body;
  const task = tasksService.create({ title, description, userId });
  res.status(201).json(task);
};

exports.update = (req, res) => {
  const { title, description, completed, userId } = req.body;
  const task = tasksService.update(Number(req.params.id), { title, description, completed, userId });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.delete = (req, res) => {
  const task = tasksService.delete(Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ message: "Task deleted", task });
};
