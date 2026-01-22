const emailsService = require("../services/emailsService");

exports.getAll = (req, res) => {
  res.json(emailsService.getAll());
};

exports.getById = (req, res) => {
  const email = emailsService.getById(Number(req.params.id));
  if (!email) return res.status(404).json({ error: "Email not found" });
  res.json(email);
};

exports.create = (req, res) => {
  const { address, verified, userId } = req.body;
  const newEmail = emailsService.create({ address, verified, userId });
  res.status(201).json(newEmail);
};

exports.update = (req, res) => {
  const { address, verified, userId } = req.body;
  const updated = emailsService.update(Number(req.params.id), { address, verified, userId });
  if (!updated) return res.status(404).json({ error: "Email not found" });
  res.json(updated);
};

exports.delete = (req, res) => {
  const deleted = emailsService.delete(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Email not found" });
  res.json({ message: "Email deleted", deleted });
};
