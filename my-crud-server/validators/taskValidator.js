const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Поле 'title' не может быть пустым",
    "string.min": "Заголовок должен содержать хотя бы 1 символ",
    "string.max": "Заголовок не может превышать 100 символов",
    "any.required": "Поле 'title' обязательно"
  }),
  completed: Joi.boolean().default(false)
});

module.exports = {
  createTask: taskSchema,
  updateTask: taskSchema.options({ abortEarly: false })
};