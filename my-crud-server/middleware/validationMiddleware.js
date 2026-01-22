const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        const fieldName = detail.path[0];
        errors[fieldName] = detail.message; 
      });

      return res.status(400).json({
        success: false,
        message: "Ошибка валидации данных",
        errors: errors 
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = validationMiddleware;