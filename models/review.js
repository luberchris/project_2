'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    score: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User);
    Review.belongsTo(models.Event);
  };
  return Review;
};