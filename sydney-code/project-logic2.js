// Initialize Firebase
var config = {
    apiKey: "AIzaSyADlsp7noH7w2HwA27QtQYn6zYS-qH2bZY",
    authDomain: "group-project-1-214917.firebaseapp.com",
    databaseURL: "https://group-project-1-214917.firebaseio.com",
    projectId: "group-project-1-214917",
    storageBucket: "",
    messagingSenderId: "580061043430"
  };

firebase.initializeApp(config);

var database = firebase.database();

var recentSearchList = [];

var recentSearchItem = {
    artist: "",
    top5videos: []
}

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
        //console.log(JSON.stringify(response));
        // console.log(response.items[0].snippet.title);
        recentSearchItem.artist = artist;
        recentSearchItem.top5videos = [];

        for (var i = 0; i < response.items.length; i++) {
            // console.log(response.items[i].snippet.title);
            // console.log(response.items[i].id.videoId);
            // console.log(response.items[i].snippet.thumbnails.medium.url);
            // //console.log(response.items[i].statistics.viewCount);
            // console.log(response.items[i].snippet.description);

            var title = response.items[i].snippet.title;
            var titleP = "<p>" + title + "</p>";
            var description = response.items[i].snippet.description;
            var descriptionP = "<p>" + description + "</p>";
            var thumbnail = response.items[i].snippet.thumbnails.medium.url;
            var vidId = response.items[i].id.videoId;
            var link = "https://www.youtube.com/watch?v=" + vidId;
            var imageLink = "<a href='" + link + "' target='_blank'><img src='" + thumbnail + "' ></a>";

            
            $("#youtube-thumbnails").append(imageLink);
            $("#youtube-thumbnails").append(titleP);
            $("#youtube-thumbnails").append(descriptionP);

            recentSearchItem.top5videos.push(imageLink + titleP);
            

        }
        if (recentSearchList.length < 5) {
            recentSearchList.unshift(recentSearchItem);
        }
        else {
            console.log(recentSearchList);
            recentSearchList.splice(4, 1);
            console.log(recentSearchList);
            recentSearchList.unshift(recentSearchItem);
        }
       
        // Creates local "temporary" object for holding artist search data
        // var newSearch = {
        //     artist: artist,
        //     title: response.items[0].snippet.title,
        //     description: response.items[0].snippet.description
        // };
        // database.ref().push(newSearch);
        database.ref().set({
            recentSearchList: recentSearchList
        });

        //  var videoID = response.items[0].id.videoId;

        // var iframe = '<iframe id="ytplayer" type="text/html" width="640" height="360"' +
        // ' src="https://www.youtube.com/embed/' + videoID + '"' +
        // ' frameborder="0"></iframe>';
        // $("#youtube-video").prepend(iframe);

    });

    $("#keyword").val("");

});

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    //$("#click-value").text(snapshot.val().clickCount);
    //clickCounter = snapshot.val().clickCount;
    
    recentSearchList = snapshot.val().recentSearchList;
    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
