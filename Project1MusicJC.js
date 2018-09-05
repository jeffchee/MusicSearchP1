console.log("js is loaded")


$(document).ready(function () {

    $("#searching").on("click", function () {

        var search = $("#searchTerm").val();
        console.log("click")

        var queryURL = "https://cors.io/?http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search + "&api_key=8008974b60dc438fc58b3ca8d8e82fae&format=json";


        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (responseLast) {

            var data = JSON.parse(responseLast);
            console.log(data);

            console.log(data.artist.bio.content);

            $("#outputSummary").text(data.artist.bio.content);
            // ^gets data content, might be better with summary

            var imgURL = data.artist.image[3]["#text"];

            var imageU = $("<img>").attr("src", imgURL);

            var artistDiv = $("<div class='ArtistImage'>");

            console.log(data.artist.image[3]);

            artistDiv.append(imageU);

            $("#outputImage").prepend(artistDiv);


        })
    })

});