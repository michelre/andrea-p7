'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    isLike: DataTypes.INTEGER
  }, {});
  Like.associate = function (models) {

    models.User.belongsToMany(models.Message, {
      through: models.Like,
    });

    models.Message.belongsToMany(models.User, {
      through: models.Like,
    });
  };
  return Like;
};
