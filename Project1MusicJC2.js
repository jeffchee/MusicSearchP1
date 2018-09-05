console.log("js2 is loaded")


$(document).ready(function () {

    $("#search").on("click", function () {

        var search = $("#searchTerm").val();
        console.log("click")

        var queryURL = "https://cors.io/?https://newsapi.org/v2/everything?q=" + search + "&apiKey=7673a23a71a64738bd9a8c446bd4b0b0";



        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (responseLast) {

            var data = JSON.parse(responseLast);
            console.log(data);

            console.log(data.articles[0].title);
            console.log(data.articles[0].author);
            console.log(data.articles[0].description);
            console.log(data.articles[0].url);

            $("#articlesTitle").text(data.articles[0].title);

            $("#articlesAuthor").text(data.articles[0].author);

            $("#articlesDescription").text(data.articles[0].description);

            $("#articlesUrl").text(data.articles[0].url);
        })


    });
});




            // function main() {
            //     $(".btn").click(function() {
            //         $("#iframe").attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
            //         $(".embed-container").css('visibility', 'visible');
            //     });

            //     function wikiAjax (searchURL) {
            //         return $.ajax({
            //             url: searchURL,
            //             jsonp: "callback",
            //             dataType: 'jsonp',
            //             xhrFields: {
            //                 withCredentials: true
            //             }
            //         });
            //     }

            //     $(".search-form").submit(function() {
            //         event.preventDefault(); 
            //         var searchText = $('#search').val();
            //         var searchURL = "" + searchText + "";
            //         console.log(searchURL);
            //         var wikiResponse = wikiAjax(searchURL);
            //         wikiResponse.done(function(data) {
            //             console.log(data);
            //         }).fail(function(err) {
            //             alert("The call has been rejected");
            //         });
            //     });
            // }



            // $(document).ready(main);