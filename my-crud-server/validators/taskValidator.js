const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Поле 'title' не может быть пустым",
    "string.min": "Заголовок должен содержать хотя бы 1 символ",
    "string.max": "Заголовок не может превышать 100 символов",
    "any.required": "Поле 'title' обязательно"
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Описание должно быть строкой"
  }),
  completed: Joi.boolean().default(false),
  userId: Joi.number().integer().required().messages({
    "number.base": "userId должен быть числом",
    "any.required": "Поле 'userId' обязательно"
  })
});

module.exports = {
  createTask: taskSchema,
  updateTask: taskSchema.fork(["title", "description", "completed", "userId"], field => field.optional()).options({ abortEarly: false })
};
