const express = require("express");
const router = express.Router();
const { User } = require("../models");
const validationMiddleware = require("../middleware/validationMiddleware");
const { createUser, updateUser } = require("../validators/userValidator");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: ["Users"]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: ["Users"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пользователь найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    res.json({ user });
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: ["Users"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", validationMiddleware(createUser), async (req, res) => {
  try {
    const savedUser = await User.create(req.validatedBody);
    res.status(201).json({ message: "Пользователь создан", user: savedUser });
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    res.status(500).json({ message: "Не удалось сохранить пользователя" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Обновить пользователя
 *     tags: ["Users"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *       400:
 *         description: Ошибка валидации
 */
router.put("/:id", validationMiddleware(updateUser), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    await user.update(req.validatedBody);
    res.json({ message: "Пользователь обновлён", user });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    res.status(500).json({ message: "Не удалось обновить пользователя" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: ["Users"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Пользователь удалён
 *       404:
 *         description: Пользователь не найден
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ message: "Не удалось удалить пользователя" });
  }
});

module.exports = router;