'use strict';

const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // association
        models.User.hasMany(models.Message)

      }
    }
  });
  sequelize.sync()
  return User;
}