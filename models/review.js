'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    score: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    event_id : DataTypes.BIGINT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User);
  };
  return Review;
};