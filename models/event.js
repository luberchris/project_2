module.exports = function(sequelize, DataTypes) {
    var EventsTest = sequelize.define("EventsTest", {
        event_id: DataTypes.STRING,
        title: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        description: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        ticketUrl : DataTypes.TEXT,
        startDate: DataTypes.TEXT,
        endDate: DataTypes.TEXT, 
        venueTitle : DataTypes.TEXT,
        venueAddress : DataTypes.TEXT
    });
    return EventsTest;
  };
  