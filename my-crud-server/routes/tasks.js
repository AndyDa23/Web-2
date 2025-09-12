const express = require("express");
const router = express.Router(); // создаём роутер
const validationMiddleware = require("../middleware/validationMiddleware");
const { createTask, updateTask } = require("../validators/taskValidator");
const taskStorageService = require("../services/taskStorageService");

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
  const tasks = await taskStorageService.getTasks();
  res.json({ tasks });
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Задача не найдена
 */
router.get("/:id", async (req, res) => {
  const tasks = await taskStorageService.getTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Задача не найдена" });
  }
  res.json({ task });
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Задача создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/", validationMiddleware(createTask), async (req, res) => {
  try {
    const savedTask = await taskStorageService.addTask(req.validatedBody);
    res.status(201).json({
      message: "Задача создана и сохранена",
       savedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Не удалось сохранить задачу"
    });
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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Задача обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Задача не найдена
 */
router.put("/:id", validationMiddleware(updateTask), async (req, res) => {
  try {
    const updatedTask = await taskStorageService.updateTask(req.params.id, req.validatedBody);
    res.json({
      message: "Задача обновлена",
       updatedTask
    });
  } catch (error) {
    if (error.message === "Задача не найдена") {
      return res.status(404).json({ message: "Задача не найдена" });
    }
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
    await taskStorageService.deleteTask(req.params.id);
    return res.status(200).send();
  } catch (error) {
    if (error.message === "Задача не найдена") {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    return res.status(500).json({ message: "Не удалось удалить задачу" });
  }
});

module.exports = router; 