const emailsService = require('../services/emailsService');

exports.getEmails = (req, res) => res.json(emailsService.getAll());

exports.getEmail = (req, res) => {
  const email = emailsService.getById(req.params.id);
  if (!email) return res.status(404).json({ message: 'Email not found' });
  res.json(email);
};

exports.createEmail = (req, res) => {
  const newEmail = emailsService.create(req.body);
  res.status(201).json(newEmail);
};

exports.updateEmail = (req, res) => {
  const updated = emailsService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Email not found' });
  res.json(updated);
};

exports.deleteEmail = (req, res) => {
  const deleted = emailsService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Email not found' });
  res.json({ message: 'Email deleted' });
};
