const fs = require("fs").promises;
const path = require("path");

const TASKS_FILE = path.resolve(__dirname, "../data/tasks.json");

module.exports.getTasks = async () => {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Ошибка чтения tasks.json:", error.message);
    return [];
  }
};

module.exports.addTask = async (taskData) => {
  try {
    const tasks = await this.getTasks();
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
    return newTask;
  } catch (error) {
    console.error("❌ Ошибка записи в tasks.json:", error.message);
    throw new Error("Не удалось сохранить задачу");
  }
};

module.exports.updateTask = async (id, taskData) => {
  const tasks = await this.getTasks();
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) throw new Error("Задача не найдена");

  tasks[index] = { ...tasks[index], ...taskData };
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
  return tasks[index];
};

module.exports.deleteTask = async (id) => {
  const tasks = await this.getTasks();
  const initialLength = tasks.length;
  const updatedTasks = tasks.filter(t => t.id !== parseInt(id));

  if (updatedTasks.length === initialLength) throw new Error("Задача не найдена");

  await fs.writeFile(TASKS_FILE, JSON.stringify(updatedTasks, null, 2), "utf8");
};