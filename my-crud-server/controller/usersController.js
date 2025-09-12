const usersService = require("../services/usersService");

exports.getAll = (req, res) => res.json(usersService.getAll());
exports.getById = (req, res) => {
  const user = usersService.getById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
exports.create = (req, res) => {
  const { name, email } = req.body;
  const user = usersService.create({ name, email });
  res.status(201).json(user);
};
exports.update = (req, res) => {
  const { name, email } = req.body;
  const user = usersService.update(parseInt(req.params.id), { name, email });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
exports.delete = (req, res) => {
  const user = usersService.delete(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
