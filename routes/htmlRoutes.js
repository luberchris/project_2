// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var axios = require("axios");
var moment = require("moment");

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
      eventBriteDB.data.events.forEach(function(event){
        event.start.local=moment(event.start.local).format('MMMM Do YYYY, h:mm a');
        event.end.local=moment(event.end.local).format('MMMM Do YYYY, h:mm a');
      })
      axios({
        method: "get",
        url : "https://www.eventbriteapi.com/v3/categories/?token=IJBDXJMHIUBUT3BVNWH6"
      })
      .then(function(categoryDB){
        res.render("event", {
          eventBriteDB : eventBriteDB,
          categoryDB : categoryDB
        })
      })
    });
    
  });


  app.get("/event/:page", function(req, res){
    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/search/?"+
      "location.address=Philadelphia&"+
      "token=IJBDXJMHIUBUT3BVNWH6&"+
      "page="+ req.params.page
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
      eventBriteDB.data.start.local=moment(eventBriteDB.data.start.local).format('MMMM Do YYYY, h:mm a');
      eventBriteDB.data.end.local=moment(eventBriteDB.data.end.local).format('MMMM Do YYYY, h:mm a');
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

            db.Review.findAll({
              where : {
                event_id : req.params.id 
              },
              include: [db.User]
            }).then(function(reviewDB){
              console.log("reviewDB---------------------")
              console.log(reviewDB);
              res.render("post", {
                eventBriteDB : eventBriteDB,
                categoryDB : categoryDB,
                organizerDB : organizerDB,
                venueDB : venueDB,
                reviewDB : reviewDB,
              })
            })
            
          })
          
        })
      });
    });

    
  });

  app.get("/search/:searchTerm", function(req, res){
    console.log("search=============================");
    console.log(req.params.searchTerm);

    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/search/?q="+req.params.searchTerm+"&location.address=Philadelphia&token=IJBDXJMHIUBUT3BVNWH6"
    })
    .then(function(searchDB){
      axios({
        method: "get",
        url : "https://www.eventbriteapi.com/v3/categories/?token=IJBDXJMHIUBUT3BVNWH6"
      })
      .then(function(categoryDB){
        res.render("event", {
          eventBriteDB : searchDB,
          categoryDB : categoryDB
        })
        // res.json(eventBriteDB);
      })
    });
  });

  app.get("/event/category/:id", function(req, res){
    axios({
      method:"get",
      url : "https://www.eventbriteapi.com/v3/events/search/?location.address=Philadelphia&categories="+req.params.id+"&token=IJBDXJMHIUBUT3BVNWH6"
    })
    .then(function(eventBriteDB){
      axios({
        method: "get",
        url : "https://www.eventbriteapi.com/v3/categories/?token=IJBDXJMHIUBUT3BVNWH6"
      })
      .then(function(categoryDB){
        res.render("event", {
          eventBriteDB : eventBriteDB,
          categoryDB : categoryDB
        })
        // res.json(eventBriteDB);
      })
    });
  });

  app.get("/favo/:id", function(req, res){
    db.Favorite.findAll({
      where : {
        UserId : req.params.id 
      }
    }).then(function(favoriteDB){
      res.render("favorite", {
        favoriteDB : favoriteDB
      });
    })
    
  })

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
    console.log(req.user);
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
