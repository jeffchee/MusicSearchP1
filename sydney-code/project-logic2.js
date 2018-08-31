$("#search").on("click", function () {

    var artist = $("#keyword").val().trim();

    var apikey = "AIzaSyAwFXf47eDtC2euhvpRSvmo3ntTJlaILcA";
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
        "&order=viewCount" +
        "&type=video" +
        "&videoEmbeddable=true" +
        "&maxResults=5" +
        "&q=" + artist + "&key=" + apikey;
    
    var videoList = [];

    //perform an AJAX GET request to access data from the specified URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(response.items[0].snippet.title);

        for (var i = 0; i < response.items.length; i++) {
            console.log(response.items[i].snippet.title);
            console.log(response.items[i].id.videoId);
            console.log(response.items[i].snippet.thumbnails.medium.url);

            var title = response.items[i].snippet.title;
            var thumbnail = response.items[i].snippet.thumbnails.medium.url;
            var vidId = response.items[i].id.videoId;
            var link = "https://www.youtube.com/watch?v=" + vidId;
            var imageLink = "<a href='" + link + "' target='_blank'><img src='" + thumbnail + "' ></a>";

            $("#youtube-thumbnails").append("<p>" + title + "</p>");
            $("#youtube-thumbnails").append(imageLink);

        }

        var videoID = response.items[0].id.videoId;

        var iframe = '<iframe id="ytplayer" type="text/html" width="640" height="360"' +
        ' src="https://www.youtube.com/embed/' + videoID + '"' +
        ' frameborder="0"></iframe>';
        $("#youtube-video").prepend(iframe);

    });
});

