'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    eventId : DataTypes.BIGINT,
    eventName : DataTypes.TEXT,
    eventImg : DataTypes.TEXT,
    eventStart : DataTypes.TEXT,
    eventEnd : DataTypes.TEXT
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User);
  };
  return Favorite;
};