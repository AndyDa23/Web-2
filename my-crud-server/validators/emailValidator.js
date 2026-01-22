const Joi = require("joi");

const emailSchema = Joi.object({
  address: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Неверный формат email",
      "any.required": "Поле 'address' обязательно"
    }),
  verified: Joi.boolean().default(false),
  userId: Joi.number().integer().required().messages({
    "number.base": "userId должен быть числом",
    "any.required": "Поле 'userId' обязательно"
  })
});

module.exports = {
  createEmail: emailSchema,
  updateEmail: emailSchema.fork(["address", "verified", "userId"], field => field.optional()).options({ abortEarly: false })
};
