// my-crud-server/models/task.js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  return Task;
};
