const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_crud_db", "postgres", "ТВОЙ_ПАРОЛЬ", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
