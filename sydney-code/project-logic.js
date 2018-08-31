$("#search").on("click", function () {

    var artist = $("#keyword").val().trim();

    var apikey = "AIzaSyAwFXf47eDtC2euhvpRSvmo3ntTJlaILcA";
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
        "&order=viewCount" +
        "&type=video" +
        "&videoEmbeddable=true" +
        "&maxResults=1" +
        "&q=" + artist + "&key=" + apikey;
    
    //perform an AJAX GET request to access data from the specified URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(response.items[0].snippet.title);

        var videoID = response.items[0].id.videoId;

        var iframe = '<iframe id="ytplayer" type="text/html" width="640" height="360"' +
        ' src="https://www.youtube.com/embed/' + videoID + '"' +
        ' frameborder="0"></iframe>';
        $("#youtube-video").prepend(iframe);

    });
});

