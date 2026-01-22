// my-crud-server/server.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const emailRoutes = require("./routes/emails");

const { sequelize } = require("./models"); // подключаем sequelize

const app = express();
const port = 3000;

const cors = require("cors"); 

app.use(cors());

app.use(express.json());

// Роуты
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/emails", emailRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Подключение к базе данных (без пересоздания таблиц)
sequelize.authenticate()
  .then(() => {
    console.log("✅ Подключение к PostgreSQL успешно");
    app.listen(port, () => {
      console.log(`🚀 Сервер запущен: http://localhost:${port}`);
      console.log(`📘 Swagger доступен: http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error("❌ Ошибка подключения к БД:", err);
  });
