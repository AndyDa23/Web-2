const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": " Поле 'name' не может быть пустым",
    "string.min": "Имя должно содержать минимум 2 символа",
    "string.max": "Имя не может превышать 50 символов",
    "any.required": "Поле 'name' обязательно"
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Неверный формат email",
      "any.required": "Поле 'email' обязательно"
    })
});

module.exports = {
  createUser: userSchema,
  updateUser: userSchema.options({ abortEarly: false })
};