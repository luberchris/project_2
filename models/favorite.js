'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    eventId : DataTypes.BIGINT
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User);
  };
  return Favorite;
};