const usersService = require("../services/usersService");

exports.getAll = (req, res) => {
  res.json(usersService.getAll());
};

exports.getById = (req, res) => {
  const user = usersService.getById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.create = (req, res) => {
  const { username, email, password } = req.body;
  const user = usersService.create({ username, email, password });
  res.status(201).json(user);
};

exports.update = (req, res) => {
  const { username, email, password } = req.body;
  const user = usersService.update(Number(req.params.id), { username, email, password });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.delete = (req, res) => {
  const user = usersService.delete(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted", user });
};
