// my-crud-server/models/email.js
module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define("Email", {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    verified: {
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
  }, {
    tableName: "emails"
  });

  return Email;
};
