

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
      events: eventsDB
    });
  });
  });