const express = require("express");
const router = express.Router();
const validationMiddleware = require("../middleware/validationMiddleware");
const { createUser, updateUser } = require("../validators/userValidator");
const userStorageService = require("../services/userStorageService");

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
  const users = await userStorageService.getUsers();
  res.json({ users });
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
  const users = await userStorageService.getUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }
  res.json({ user });
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", validationMiddleware(createUser), async (req, res) => {
  try {
    const savedUser = await userStorageService.addUser(req.validatedBody);
    res.status(201).json({
      message: "Пользователь создан и сохранён",
       savedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Не удалось сохранить пользователя"
    });
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
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 */
router.put("/:id", validationMiddleware(updateUser), async (req, res) => {
  try {
    const updatedUser = await userStorageService.updateUser(req.params.id, req.validatedBody);
    res.json({
      message: "Пользователь обновлён",
       updatedUser
    });
  } catch (error) {
    if (error.message === "Пользователь не найден") {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
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
    await userStorageService.deleteUser(req.params.id);
    return res.status(200).send();
  } catch (error) {
    if (error.message === "Пользователь не найден") {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    return res.status(500).json({ message: "Не удалось удалить пользователя" });
  }
});

module.exports = router;