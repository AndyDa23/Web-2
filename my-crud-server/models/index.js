const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite", // или mysql/postgres
  storage: "database.sqlite" // для sqlite
});

const User = require("./user")(sequelize, Sequelize.DataTypes);
// Тут можно подключить Task, Email и др.:
// const Task = require("./task")(sequelize, Sequelize.DataTypes);
// const Email = require("./email")(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User,
  // Task,
  // Email
};
