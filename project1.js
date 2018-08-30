$(document).ready(function(){

    $("search").on("click", function() {

        var searchTerm = $(searchTerm).val();

        var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+ search +"&utf8=";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
})


}