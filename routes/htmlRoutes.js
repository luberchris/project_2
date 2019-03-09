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
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    //     db.Example.findAll({}).then(function(dbExamples) {
    //       res.render("index", {
    //         msg: "Welcome!",
    //         examples: dbExamples
    //       });
    //     });
    //         // If the user already has an account send them to the members page
    //     if (req.user) {
    //       res.redirect("/members");
    //     }
    //     res.sendFile(path.join(__dirname, "../public/signup.html"));
    //   });

//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Load event page
  app.get("/event", function(req, res){

    var queryString = "https://phillyfunguide.com/api/events?apikey="
    var apiKey = "w236089434596839311";
    queryString += apiKey;
    queryString += "&limit=100"
    axios({
      method:'get',
      url: queryString
      // responseType:'stream'
    })
      .then(function(response) {
        console.log("--------------------------------");
        console.log(response);
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });
    res.render("event");
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
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
