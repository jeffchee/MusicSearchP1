//console.log("js2 is loaded")

var DEFAULT_ARTIST = "BTS";

$(document).ready(function () {

    // display default search results
    searchForResults(DEFAULT_ARTIST);

    var userSearch = $("#search")

    userSearch.on("click", function () {

        var search = $("#keyword").val();
        //console.log("click")

        // User input validation -- ensure that some form of input has been entered prior to running a search
        if (search != "") {
            var queryURL = "https://cors.io/?https://newsapi.org/v2/everything?q=" + search + "&apiKey=7673a23a71a64738bd9a8c446bd4b0b0";



            $.ajax({
                url: queryURL,
                method: "GET"
    
            }).then(function (responseLast) {
    
                var data = JSON.parse(responseLast);
                // console.log(data);
    
                // console.log(data.articles[0].title);
                // console.log(data.articles[0].author);
                // console.log(data.articles[0].description);
                // console.log(data.articles[0].url);
    
                $("#articlesTitle").text(data.articles[0].title);
    
                $("#articlesAuthor").text(data.articles[0].author);
    
                $("#articlesDescription").text(data.articles[0].description);
    
                $("#articlesUrl").html("<a href='" + data.articles[0].url + "' target='_blank'>" + data.articles[0].url + "</a>");
            });
        }

        // Empty out the search input field after the term has been searched for
        $("#keyword").val("");
    });

    // Button listener for dynamic search result buttons
    $(document).on("click", ".btn-s", function() {
        var prevSearch = $(this).text();
        searchForResults(prevSearch);
    });

    function searchForResults(searchTerm) {
        var search = searchTerm;
        var queryURL = "https://cors.io/?https://newsapi.org/v2/everything?q=" + search + "&apiKey=7673a23a71a64738bd9a8c446bd4b0b0";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (responseLast) {

            var data = JSON.parse(responseLast);
            // console.log(data);

            // console.log(data.articles[0].title);
            // console.log(data.articles[0].author);
            // console.log(data.articles[0].description);
            // console.log(data.articles[0].url);

            $("#articlesTitle").text(data.articles[0].title);

            $("#articlesAuthor").text(data.articles[0].author);

            $("#articlesDescription").text(data.articles[0].description);

            $("#articlesUrl").html("<a href='" + data.articles[0].url + "' target='_blank'>" + data.articles[0].url + "</a>");
        });
    }
});