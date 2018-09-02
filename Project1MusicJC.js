console.log("js is loaded")


$(document).ready(function () {

    $("#search").on("click", function () {

        var search = $("#searchTerm").val();
        console.log("click")

        var queryURL = "https://cors.io/?http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+search+"&api_key=8008974b60dc438fc58b3ca8d8e82fae&format=json";


        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response) {
            var results = response.artist;
            console.log(JSON.parse(response));
            console.log(JSON.parse(response.bio.content));
            console.log(results);
            for (var i = 0; i < results; i++) {

                var gifDiv = $("<div class='item'>");
            
                var personSummary = $("#search");

                personSummary.attr("#search", response);

                gifDiv.append(personSummary);

                $("#output").prepend(gifDiv);
               
            }
        }
        
        )
        
    }

    )
}

)