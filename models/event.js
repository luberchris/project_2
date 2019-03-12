
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    event_id: DataTypes.STRING,
    title: DataTypes.TEXT,
    thumbnail: DataTypes.TEXT,
    description: DataTypes.TEXT,
    tags: DataTypes.TEXT,
    ticketUrl: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    venueTitle: DataTypes.TEXT,
    venueAddress: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.Review);
    Event.hasMany(models.Favorite);
  };
  return Event;
};

