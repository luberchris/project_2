

$(document).ready(function() {
  var eventsDB = [];
  var queryString = "https://www.eventbriteapi.com/v3/events/search/?location.address=Philadelphia&token=IJBDXJMHIUBUT3BVNWH6";
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function(res){
    for(var i=0; i< res.events.length; i++ ){
      var event = {
        title: res.events[i].name.text,
        start: res.events[i].start.local,
        end : res.events[i].end.local
      }
      eventsDB.push(event);
    }
      console.log(eventsDB);
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2019-03-01',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: eventsDB,
    })
  });
  });

  


  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $("#login").html(data.username);
    $("#review_submit").attr("data-user", data.id);
});

var count;
function starmark(item){
    count=item.id[0];
    sessionStorage.starRating = count;
    var subid= item.id.substring(1);
    for(var i=0;i<5;i++){
        if(i<count){
            document.getElementById((i+1)+subid).style.color="orange";
        } else {
            document.getElementById((i+1)+subid).style.color="black";
        }
    }
};

$("#review_submit").on("click", function(){
    var newReview = {
        score : count,
        review : $("#comment").val(),
        event_id : $(this).data("id"),
        UserId : $(this).data("user")
    }
    
    $.ajax("/api/review", {
        type: "POST",
        data: newReview
      }).then(
        function(response) {
          console.log("created new review for event id",$(this).data("id") +"by" + $(this).data("user"));
          console.log(response)
          // Reload the page to get the updated list
          location.reload();
        }
      );
})