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
}

$("#review_submit").on("click", function(){
    var newReview = {
        score : count,
        review : $("#comment").val(),
        event_id : $(this).data("id")
    }
    
    $.ajax("/api/review", {
        type: "POST",
        data: newReview
      }).then(
        function(response) {
          console.log("created new revies on event id",$(this).data("id"));
          console.log(response)
          // Reload the page to get the updated list
          location.reload();
        }
      );
})