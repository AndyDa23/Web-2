const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Ошибка валидации данных",
        errors: errors
      });
    }

    req.validatedBody = value; // Сохраняем очищенные данные
    next();
  };
};

module.exports = validationMiddleware;