// my-crud-server/routes/emails.js
console.log("✅ emails.js загружен");
const express = require("express");
const router = express.Router();
const { Email } = require("../models");

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: Получить все email-адреса
 *     tags: ["Emails"]
 *     responses:
 *       200:
 *         description: Список email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emails:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Email'
 */
router.get("/", async (req, res) => {
  const emails = await Email.findAll();
  res.json({ emails });
});

/**
 * @swagger
 * /emails/{id}:
 *   get:
 *     summary: Получить email по ID
 *     tags: ["Emails"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID email-адреса
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Email'
 *       404:
 *         description: Email не найден
 */
router.get("/:id", async (req, res) => {
  const email = await Email.findByPk(req.params.id);
  if (!email) return res.status(404).json({ message: "Email не найден" });
  res.json({ email });
});

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Создать email
 *     tags: ["Emails"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailCreate'
 *     responses:
 *       201:
 *         description: Email создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Email'
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", async (req, res) => {
  const email = await Email.create(req.body);
  res.status(201).json({ email });
});

/**
 * @swagger
 * /emails/{id}:
 *   delete:
 *     summary: Удалить email
 *     tags: ["Emails"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID email-адреса
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Email удалён
 *       404:
 *         description: Email не найден
 */
router.delete("/:id", async (req, res) => {
  const email = await Email.findByPk(req.params.id);
  if (!email) return res.status(404).json({ message: "Email не найден" });
  await email.destroy();
  res.status(204).send();
});

module.exports = router;