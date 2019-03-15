$(document).ready(function() {
    // $.get("/api/user_data").then(function(data) {
    //     console.log(data.id)
    //     $("#login").html(data.username);
    //     $("#review_submit").data("user", data.id);
    // });
});

$.get("/api/user_data").then(function(data) {
    console.log(data);
    $("#login").html(data.username);
    $("#review_submit").attr("data-user", data.id);
    $("#addButton").attr("data-user", data.id);
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
});

$("#addButton").on("click", function(){
    var newFavorite = {
        eventId : $(this).data("id"),
        UserId : $(this).data("user")
    }

    $.ajax("/api/favorite", {
        type: "POST",
        data : newFavorite
    }).then(function(response){
        console.log("created new favorite");
    })
})