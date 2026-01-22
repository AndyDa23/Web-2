// my-crud-server/docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API — Users, Tasks & Emails",
      version: "1.0.0",
      description: "API для управления пользователями, задачами и email-адресами"
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      { name: "Users", description: "Операции с пользователями" },
      { name: "Tasks", description: "Операции с задачами" },
      { name: "Emails", description: "Операции с email-адресами" }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          }
        },
        UserCreate: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          }
        },
        UserUpdate: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
          }
        },

        Task: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["pending", "in_progress", "completed"] },
            userId: { type: "integer" }
          }
        },
        TaskCreate: {
          type: "object",
          required: ["title", "userId"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            userId: { type: "integer" }
          }
        },
        TaskUpdate: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string", enum: ["pending", "in_progress", "completed"] },
            userId: { type: "integer" }
          }
        },

        Email: {
          type: "object",
          properties: {
            id: { type: "integer" },
            address: { type: "string" },
            verified: { type: "boolean" },
            userId: { type: "integer" }
          }
        },
        EmailCreate: {
          type: "object",
          required: ["address", "userId"],
          properties: {
            address: { type: "string" },
            verified: { type: "boolean" },
            userId: { type: "integer" }
          }
        },
        EmailUpdate: {
          type: "object",
          properties: {
            address: { type: "string" },
            verified: { type: "boolean" },
            userId: { type: "integer" }
          }
        }
      }
    }
  },
  // ЯВНО УКАЗЫВАЕМ ВСЕ ФАЙЛЫ МАРШРУТОВ
  apis: [
    __dirname + "/../routes/users.js",
    __dirname + "/../routes/tasks.js",
    __dirname + "/../routes/emails.js"
  ]
};

module.exports = swaggerJsdoc(options);

const spec = swaggerJsdoc(options);
console.log("🔍 Сгенерированные теги:", spec.tags?.map(t => t.name));
console.log("🔍 Сгенерированные пути:", Object.keys(spec.paths));
module.exports = spec