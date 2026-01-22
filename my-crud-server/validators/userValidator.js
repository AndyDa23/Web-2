const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Поле 'username' не может быть пустым",
    "string.min": "Имя пользователя должно содержать минимум 2 символа",
    "string.max": "Имя пользователя не может превышать 50 символов",
    "any.required": "Поле 'username' обязательно"
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Неверный формат email",
    "any.required": "Поле 'email' обязательно"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Поле 'password' не может быть пустым",
    "string.min": "Пароль должен содержать минимум 6 символов",
    "any.required": "Поле 'password' обязательно"
  })
});

module.exports = {
  createUser: userSchema,
  updateUser: userSchema.fork(["username", "email", "password"], field => field.optional()).options({ abortEarly: false })
};
