const express = require("express");
const app = express();
const port = 3000;

// Парсинг JSON
app.use(express.json());

// Данные
let users = []; // { id, name, email }
let tasks = []; // { id, title, completed, userId }

// ---------- USERS ----------

// CREATE USER
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Укажите name и email" });

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET ALL USERS
app.get("/users", (req, res) => {
  res.json(users);
});

// GET ONE USER
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });
  res.json(user);
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Укажите name и email" });

  user.name = name;
  user.email = email;
  res.json(user);
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Пользователь не найден" });

  // Удаляем также все задачи пользователя
  tasks = tasks.filter(t => t.userId !== parseInt(req.params.id));

  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

// ---------- TASKS ----------

// CREATE TASK
app.post("/tasks", (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) return res.status(400).json({ error: "Укажите title и userId" });

  const user = users.find(u => u.id === parseInt(userId));
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  const newTask = { id: tasks.length + 1, title, completed: false, userId: user.id };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET ALL TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET TASK BY ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Задача не найдена" });
  res.json(task);
});

// UPDATE TASK
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Задача не найдена" });

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Задача не найдена" });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

// GET TASKS BY USER
app.get("/users/:id/tasks", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  const userTasks = tasks.filter(t => t.userId === userId);
  res.json(userTasks);
});

// ---------- SERVER ----------
app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
