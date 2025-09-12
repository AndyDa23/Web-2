const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        const fieldName = detail.path[0]; // Имя поля (например, "name")
        errors[fieldName] = detail.message; // Сохраняем сообщение по имени поля
      });

      return res.status(400).json({
        success: false,
        message: "Ошибка валидации данных",
        errors: errors // ← Теперь это объект: { name: "...", email: "..." }
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = validationMiddleware;