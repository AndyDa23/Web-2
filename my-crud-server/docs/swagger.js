const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Users & Tasks API",
      version: "1.0.0",
      description: "Пример REST API с пользователями, задачами и email-сообщениями",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Локальный сервер",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "Операции с пользователями"
      },
      {
        name: "Tasks",
        description: "Операции с задачами"
      },
      {
        name: "Emails",
        description: "Операции с email-сообщениями"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" }
          }
        },
        Task: {
          type: "object",
          properties: {
            title: { type: "string" },
            completed: { type: "boolean" },
          }
        },
        Email: {
          type: "object",
          properties: {
            to: { type: "string", format: "email" },
            subject: { type: "string" },
            body: { type: "string" },
          }
        }
      }
    }
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;