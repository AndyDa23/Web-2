// my-crud-server/models/index.js
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.User = require("./user")(sequelize, DataTypes);
db.Task = require("./task")(sequelize, DataTypes);
db.Email = require("./email")(sequelize, DataTypes);

// Ассоциации
db.User.hasMany(db.Task, { foreignKey: "userId", as: "tasks" });
db.Task.belongsTo(db.User, { foreignKey: "userId", as: "user" });

db.User.hasMany(db.Email, { foreignKey: "userId", as: "emails" });
db.Email.belongsTo(db.User, { foreignKey: "userId", as: "user" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
