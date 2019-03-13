// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {

    res.render("index");
  });

  // Load event page
  app.get("/event", function(req, res){

    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/search/?location.address=Philadelphia&token=IJBDXJMHIUBUT3BVNWH6"
    })
    .then(function(eventBriteDB){
      res.render("event", {eventBriteDB})
    });
    
  });

  app.get("/event/:page", function(req, res){

    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/search/?"+
      "location.address=Philadelphia&"+
      "token=IJBDXJMHIUBUT3BVNWH6&"+
      "page="+req.params.page
    })
    .then(function(eventBriteDB){
      res.render("event", {eventBriteDB})
    });
    
  });



  app.get("/calendar", function(req, res){
    res.render("calendar");
  });

  app.get("/post/:id", function(req, res){
    var category_id = "";
    var venue_id = "";
    var organizer_id = "";
    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/"+req.params.id+"?token=IJBDXJMHIUBUT3BVNWH6"
    })
    .then(function(eventBriteDB){
      category_id = eventBriteDB.data.category_id;
      venue_id = eventBriteDB.data.venue_id;
      organizer_id = eventBriteDB.data.organizer_id;
      axios({
        method:"get",
        url : "https://www.eventbriteapi.com/v3/categories/"+category_id+"/?token=IJBDXJMHIUBUT3BVNWH6"
      })
      .then(function(categoryDB){
        axios({
          method:"get",
          url : "https://www.eventbriteapi.com/v3/organizers/"+organizer_id+"/?token=IJBDXJMHIUBUT3BVNWH6"
        })
        .then(function(organizerDB){
          axios({
            method:"get",
            url : "https://www.eventbriteapi.com/v3/venues/"+venue_id+"/?token=IJBDXJMHIUBUT3BVNWH6"
          })
          .then(function(venueDB){
            res.render("post", {
              eventBriteDB : eventBriteDB,
              categoryDB : categoryDB,
              organizerDB : organizerDB,
              venueDB : venueDB
            })
          })
          
        })
      });
    });

    
  });

  // app.get("/test", function(req, res){
  //   var queryString = "https://phillyfunguide.com/api/events?apikey="
  //   var apiKey = "w236089434596839311";
  //   queryString += apiKey;
  //   queryString += "&limit=18"
  //   axios({
  //     method:'get',
  //     url: queryString
  //   })
  //     .then(function(funGuideDB) {
        
  //       for(var i=0; i<funGuideDB.data.items.length; i++){
  //         console.log("----------------funsavers----------------");
  //         console.log(funGuideDB.data.items[i].funsavers);
  //       }
        
        
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ 
      where: { 
        id: req.params.id 
      } 
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
