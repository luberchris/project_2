
var queryString = "https://www.eventbriteapi.com/v3/events/?token="
// https://www.eventbriteapi.com/v3/venues/{venue_id}/events/
var apiKey = "IJBDXJMHIUBUT3BVNWH6";
queryString += apiKey;
$.ajax({
    url: queryString,
    method: "GET",
    // headers: {
    //     "Authorization": "IJBDXJMHIUBUT3BVNWH6"
    //   }

}).then(function(res){
    console.log(res.events[0]);
    $("#logo").attr("src", res.events[0].logo.original.url);
    $("#name").html(res.events[0].name.text);
    $("#description").html(res.events[0].description.text);
    $("#test").html(res);
});



// curl -v  -X GET "https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=8af2f66d&app_key=e3923bd4bba07066766ac03ca80b2fa0

// $.ajax({
//     url: "https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=8af2f66d&app_key=e3923bd4bba07066766ac03ca80b2fa0",
//     method: "GET",
//     // headers: {
//     //     "Authorization": "IJBDXJMHIUBUT3BVNWH6"
//     //   }

// }).then(function(res){
//     console.log("===========================")
//     console.log(res);
//     // console.log(res.events[0].name.text);
//     // $("#logo").attr("src", res.events[0].logo.original.url);
//     // $("#name").html(res.events[0].name.text);
//     // $("#description").html(res.events[0].description.text);
//     // $("#test").html(res);
// });

// https://phillyfunguide.com/api/events?apikey=MYKEYGOESHERE&limit=100
// var queryString = "https://phillyfunguide.com/api/events?apikey="
// var apiKey = "w236089434596839311";
// queryString += apiKey;
// queryString += "&limit=100"
// $.ajax({
//     url: queryString,
//     method: "GET",
//     // headers: {
//     //     "Authorization": "IJBDXJMHIUBUT3BVNWH6"
//     //   }

// }).then(function(res){
//     console.log(res);
//     // console.log(res.events[0].name.text);
//     // $("#logo").attr("src", res.events[0].logo.original.url);
//     // $("#name").html(res.events[0].name.text);
//     // $("#description").html(res.events[0].description.text);
//     // $("#test").html(res);
// });