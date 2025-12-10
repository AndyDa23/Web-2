module.exports = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Регистрация пользователя",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                example: {
                  email: "test@gmail.com",
                  password: "123456"
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "OK",
          }
        }
      }
    },

    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Авторизация пользователя",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                example: {
                  email: "test@gmail.com",
                  password: "123456"
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "JWT Token"
          }
        }
      }
    }
  }
};
