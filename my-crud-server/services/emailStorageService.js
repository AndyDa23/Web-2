const fs = require("fs").promises;
const path = require("path");

const EMAILS_FILE = path.resolve(__dirname, "../data/emails.json");

module.exports.getEmails = async () => {
  try {
    const data = await fs.readFile(EMAILS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Ошибка чтения emails.json:", error.message);
    return [];
  }
};

module.exports.addEmail = async (emailData) => {
  try {
    const emails = await this.getEmails();
    const newEmail = {
      id: Date.now(),
      ...emailData,
      sentAt: new Date().toISOString()
    };
    emails.push(newEmail);
    await fs.writeFile(EMAILS_FILE, JSON.stringify(emails, null, 2), "utf8");
    return newEmail;
  } catch (error) {
    console.error("❌ Ошибка записи в emails.json:", error.message);
    throw new Error("Не удалось сохранить письмо");
  }
};

module.exports.deleteEmail = async (id) => {
  try {
    const emails = await this.getEmails(); // Убедимся, что это массив

    if (!Array.isArray(emails)) {
      throw new Error("Неверный формат данных в emails.json");
    }

    const initialLength = emails.length;
    const updatedEmails = emails.filter(e => e.id !== parseInt(id));

    if (updatedEmails.length === initialLength) {
      throw new Error("Письмо не найдено");
    }

    await fs.writeFile(EMAILS_FILE, JSON.stringify(updatedEmails, null, 2), "utf8");
  } catch (error) {
    console.error("❌ Ошибка удаления email:", error.message);
    throw new Error("Не удалось удалить email");
  }
};