const Joi = require("joi");

const emailSchema = Joi.object({
  to: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Неверный формат получателя email",
      "any.required": "Поле 'to' обязательно"
    }),
  subject: Joi.string().min(1).max(200).required().messages({
    "string.empty": "Тема письма не может быть пустой",
    "string.min": "Тема должна содержать хотя бы 1 символ",
    "string.max": "Тема не может превышать 200 символов",
    "any.required": "Поле 'subject' обязательно"
  }),
  body: Joi.string().max(1000).optional().allow("").messages({
    "string.max": "Тело письма не может превышать 1000 символов"
  })
});

module.exports = {
  sendEmail: emailSchema
};