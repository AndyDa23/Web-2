// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // если Sequelize
const { body, validationResult } = require("express-validator");

// Секрет для JWT (лучше вынести в .env)
const JWT_SECRET = "supersecretkey";
const JWT_EXPIRES = "1h";

// Swagger tags
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация и регистрация
 */

// ======================
// РЕГИСТРАЦИЯ
// ======================
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 */
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      // Проверка, есть ли уже пользователь
      let existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Пользователь уже существует" });

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ email, password: hashedPassword });
      res.status(201).json({ message: "Пользователь создан", user: { id: newUser.id, email: newUser.email } });
    } catch (err) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

// ======================
// ЛОГИН
// ======================
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Токен возвращён
 */
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Неверный email или пароль" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Неверный email или пароль" });

      // Создаём токен
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

module.exports = router;
