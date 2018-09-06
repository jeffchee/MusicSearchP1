console.log("js2 is loaded")


$(document).ready(function () {

    var userSearch = $("#search")

    userSearch.on("click", function () {

        var search = $("#keyword").val();
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
})