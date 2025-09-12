const fs = require("fs").promises;
const path = require("path");

const USERS_FILE = path.resolve(__dirname, "../data/users.json");

module.exports.getUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Ошибка чтения users.json:", error.message);
    return [];
  }
};

module.exports.addUser = async (userData) => {
  try {
    const users = await this.getUsers();
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
    return newUser;
  } catch (error) {
    console.error("❌ Ошибка записи в users.json:", error.message);
    throw new Error("Не удалось сохранить пользователя");
  }
};

module.exports.updateUser = async (id, userData) => {
  const users = await this.getUsers();
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) throw new Error("Пользователь не найден");

  users[index] = { ...users[index], ...userData };
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  return users[index];
};

module.exports.deleteUser = async (id) => {
  const users = await this.getUsers();
  const initialLength = users.length;
  const updatedUsers = users.filter(u => u.id !== parseInt(id));

  if (updatedUsers.length === initialLength) throw new Error("Пользователь не найден");

  await fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2), "utf8");
};