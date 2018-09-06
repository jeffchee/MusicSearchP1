console.log("js is loaded");


$(document).ready(function () {

    var userSearch = $("#search");
    

    userSearch.on("click", function () {

        var search = $("#keyword").val();

        // User input validation -- ensure that some form of input has been entered prior to running a search
        if (search != "") {
            
            //console.log(search);

            var queryURL = "https://cors.io/?http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search + "&api_key=8008974b60dc438fc58b3ca8d8e82fae&format=json";


            $.ajax({
                url: queryURL,
                method: "GET"

            }).then(function (responseLast) {

                var data = JSON.parse(responseLast);
                console.log(data);

                console.log(data.artist.bio.content);
                console.log(data.artist.name);

                $("#outputSummary").text(data.artist.bio.content);
                $("#outputName").html(data.artist.name);

                var imgURL = data.artist.image[3]["#text"];

                var imageU = $("<img>").attr("src", imgURL);

                var artistDiv = $("<div class='ArtistImage'>");

                console.log(data.artist.image[3]["#text"]);

                artistDiv.append(imageU);

                $("#outputImage").html(artistDiv);
            });
        }
    });
    // Button listener for dynamic search result buttons
    $(document).on("click", ".btn-s", function() {
        console.log("HERE1");
        var prevSearch = $(this).text();
        
        searchForResults(prevSearch);
    });

    function searchForResults(searchTerm) {
        var search = searchTerm;
        console.log(search);
        var queryURL = "https://cors.io/?http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search + "&api_key=8008974b60dc438fc58b3ca8d8e82fae&format=json";


                $.ajax({
                    url: queryURL,
                    method: "GET"

                }).then(function (responseLast) {

                    var data = JSON.parse(responseLast);
                    console.log(data);

                    console.log(data.artist.bio.content);
                    console.log(data.artist.name);

                    $("#outputSummary").text(data.artist.bio.content);
                    $("#outputName").html(data.artist.name);

                    var imgURL = data.artist.image[3]["#text"];

                    var imageU = $("<img>").attr("src", imgURL);

                    var artistDiv = $("<div class='ArtistImage'>");

                    console.log(data.artist.image[3]["#text"]);

                    artistDiv.append(imageU);

                    $("#outputImage").html(artistDiv);
                });
    }
        
});
