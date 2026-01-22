const express = require("express");
const router = express.Router();
const { Task } = require("../models");
const validationMiddleware = require("../middleware/validationMiddleware");
const { createTask, updateTask } = require("../validators/taskValidator");

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Получить все задачи
 *     tags: ["Tasks"]
 *     responses:
 *       200:
 *         description: Список задач
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ tasks });
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     tags: ["Tasks"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Задача найдена
 *       404:
 *         description: Задача не найдена
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Задача не найдена" });
    res.json({ task });
  } catch (error) {
    console.error("Ошибка при получении задачи:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Создать новую задачу
 *     tags: ["Tasks"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       201:
 *         description: Задача создана
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", validationMiddleware(createTask), async (req, res) => {
  try {
    const savedTask = await Task.create(req.validatedBody);
    res.status(201).json({ message: "Задача создана", task: savedTask });
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    res.status(500).json({ message: "Не удалось создать задачу" });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Обновить задачу
 *     tags: ["Tasks"]
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
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Задача обновлена
 *       404:
 *         description: Задача не найдена
 */
router.put("/:id", validationMiddleware(updateTask), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Задача не найдена" });
    await task.update(req.validatedBody);
    res.json({ message: "Задача обновлена", task });
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    res.status(500).json({ message: "Не удалось обновить задачу" });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     tags: ["Tasks"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Задача не найдена" });
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ message: "Не удалось удалить задачу" });
  }
});

module.exports = router;
