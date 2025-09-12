const tasksService = require("../services/tasksService");

exports.getAll = (req, res) => res.json(tasksService.getAll());
exports.getById = (req, res) => {
  const task = tasksService.getById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};
exports.create = (req, res) => {
  const { title, userId } = req.body;
  const task = tasksService.create({ title, userId });
  res.status(201).json(task);
};
exports.update = (req, res) => {
  const { title, completed } = req.body;
  const task = tasksService.update(parseInt(req.params.id), { title, completed });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};
exports.delete = (req, res) => {
  const task = tasksService.delete(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};
