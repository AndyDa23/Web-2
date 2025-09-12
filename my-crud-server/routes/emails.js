const express = require("express");
const router = express.Router();
const validationMiddleware = require("../middleware/validationMiddleware");
const { sendEmail } = require("../validators/emailValidator");
const emailStorageService = require("../services/emailStorageService");

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: Получить все email-сообщения
 *     tags: ["Emails"]
 *     responses:
 *       200:
 *         description: Список писем
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
  const emails = await emailStorageService.getEmails();
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
  const emails = await emailStorageService.getEmails();
  const email = emails.find(e => e.id === parseInt(req.params.id));
  if (!email) {
    return res.status(404).json({ message: "Email не найден" });
  }
  res.json({ email });
});

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Отправить email
 *     tags: ["Emails"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       201:
 *         description: Email отправлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Email'
 */
router.post("/", validationMiddleware(sendEmail), async (req, res) => {
  try {
    const savedEmail = await emailStorageService.addEmail(req.validatedBody);
    res.status(201).json({
      message: "Email отправлен и сохранён",
       savedEmail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Не удалось сохранить письмо"
    });
  }
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
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Email удалён
 *       404:
 *         description: Email не найден
 */
router.delete("/:id", async (req, res) => {
  try {
    await emailStorageService.deleteEmail(req.params.id);
    return res.status(204).send();
  } catch (error) {
    if (error.message === "Письмо не найдено") {
      return res.status(404).json({ message: "Email не найден" });
    }
    return res.status(500).json({ message: "Не удалось удалить email" });
  }
});

module.exports = router;