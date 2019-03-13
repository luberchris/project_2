$('#search').on('click', function(event){
    event.preventDefault();
    console.log("search js==================================")
    console.log("$('#searchInput').val()");
    var searchTerm = $("#searchInput").val();

    var newSearch = {
        search : searchTerm
    }
    console.log(newSearch);

    window.location = "/search/"+searchTerm;
    // $.ajax("/search/"+searchTerm, {
    //     type: "GET"
    // // data: newSearch
    // }).then(function() {
    //     console.log("succeess");
    // //   location.reload();
    // });

    $("#searchInput").val("");
});