'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    score: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User);
    Review.belongsTo(models.Event);
  };
  return Review;
};