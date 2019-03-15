

$(".deleteFavorite").on("click", function(){
    var id=$(this).data("id");

    $.ajax("/api/favorite/"+id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted favorite");
          // Reload the page to get the updated list
          location.reload();
        }
      );
})
