const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const emailRoutes = require("./routes/emails");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

app.use(express.json());

// Подключаем роуты
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/emails", emailRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Запуск сервера
app.listen(port, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${port}`);
  console.log(`📘 Swagger доступен: http://localhost:${port}/api-docs`);
});
