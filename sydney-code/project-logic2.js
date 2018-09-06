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

var favArtistItem = {
    artist: "",
    top5videos: []
}

$("#search").on("click", function () {

    var artist = $("#keyword").val().trim();

    $(".video").empty();
    $("#no-search-term").empty();

    // User input validation -- ensure that some form of input has been entered prior to running a search
    if (artist === "") {
        $("#no-search-term").html("<i>Please enter the name of an artist you'd like to search for.</i>");

        // $("#search-history").empty();
        // if (recentSearchList.length > 0) {
        //     $("#search-history").append("<p>5 Most Recent Searches:");
        // }
        // for (var i = 0; i < recentSearchList.length; i++) {
        //     $("#search-history").append("<h3>" + recentSearchList[i].artist + "</h3>");
        //     for (var j = 0; j < recentSearchList[i].top5videos.length; j++) {
        //         $("#search-history").append(recentSearchList[i].top5videos[j]);
        //     }
        // }
        updateSideBar();
    }
    else {
        var apikey = "AIzaSyAwFXf47eDtC2euhvpRSvmo3ntTJlaILcA";
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
            "&order=viewCount" +
            "&type=video" +
            "&videoEmbeddable=true" +
            "&maxResults=5" +
            "&q=" + artist + "&key=" + apikey;
        
        var videoList = [];
        var vidIDs = [];
       
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
                var thumbnailSmall = response.items[i].snippet.thumbnails.default.url;
                var vidId = response.items[i].id.videoId;
                vidIDs.push(vidId);
                var link = "https://www.youtube.com/watch?v=" + vidId;
                var imageLink = "<a href='" + link + "' target='_blank'><img src='" + thumbnail + "' ></a>";
                var imageLinkSmall = "<a href='" + link + "' target='_blank'><img src='" + thumbnailSmall + "' ></a>";

                //var viewCountP = getViewCount(vidId);
                //console.log(viewCountP);
                
                $("#video" + i).html(imageLink);
                $("#video" + i).append(titleP);
                //$("#video" + i).append(descriptionP);
                // $("#youtube-thumbnails").append(imageLink);
                // $("#youtube-thumbnails").append(titleP);
                // $("#youtube-thumbnails").append(descriptionP);

                //$("#youtube-thumbnails").append(viewCountP);

                recentSearchItem.top5videos.push(imageLinkSmall + titleP);
                

            }

            // Update the search history div with recent search results, prior to adding 
            // the current results to the list of recent search results
            // $("#search-history").empty();
            // if (recentSearchList.length > 0) {
            //     $("#search-history").append("<p>5 Most Recent Searches:");
            // }
            // for (var i = 0; i < recentSearchList.length; i++) {
            //     $("#search-history").append("<h3>" + recentSearchList[i].artist + "</h3>");
            //     for (var j = 0; j < recentSearchList[i].top5videos.length; j++) {
            //         $("#search-history").append(recentSearchList[i].top5videos[j]);
            //     }
            // }
            updateSideBar();

            // If there are fewer than 5 recent search results, then add the most recent result 
            // to the front of the list
            // Otherwise, remove the last result in the list, and then add the most recent result
            // to the front of the list
            if (recentSearchList.length < 5) {
                recentSearchList.unshift(recentSearchItem);
            }
            else {
                console.log(recentSearchList);
                recentSearchList.splice(4, 1);
                console.log(recentSearchList);
                recentSearchList.unshift(recentSearchItem);
            }
        
            for (var i = 0; i < 5; i++) {
                var vi = vidIDs[i];
                addViewCount(vi, i);
            }

            //recentSearchList = snapshot.val().recentSearchList;
            
            database.ref().set({
                favArtist: favArtistItem,
                recentSearchList: recentSearchList
            });
        });

        $("#keyword").val("");

    }

    
});


$("#save-fave").on("click", function () {
    if (recentSearchList.length === 0) {
        console.log("no artists searched for recently");
    }
    else {
        favArtistItem.artist = recentSearchList[0].artist;
        favArtistItem.top5videos = recentSearchList[0].top5videos;
        console.log(favArtistItem.artist);
    }
    database.ref().set({
        favArtist: favArtistItem,
        recentSearchList: recentSearchList
    });
    $("#fav-artist").empty();
    if (favArtistItem.artist !== "") {
        $("#fav-artist").append("<p>Favorite Artist:");
        $("#fav-artist").append("<h3>" + favArtistItem.artist + "</h3>");
        for (var j = 0; j < favArtistItem.top5videos.length; j++) {
            $("#fav-artist").append(favArtistItem.top5videos[j]);
        }
    }

});


// Store a reference to the latest value of the recent search list
// as retrieved from firebase
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    //$("#click-value").text(snapshot.val().clickCount);
    //clickCounter = snapshot.val().clickCount;
    
    recentSearchList = snapshot.val().recentSearchList;
    favArtistItem = snapshot.val().favArtist;
    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

// Function to insert commas at the appropriate places for an integer value
function addCommas(intNum) {
return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

// Function to get the view count for the video with the given id and to then 
// add the view count to the appropriate div, given the current index i of the 
// video in the list of videos for the current artist
function addViewCount(id, i) {
    var apikey = "AIzaSyAwFXf47eDtC2euhvpRSvmo3ntTJlaILcA";
            var queryURL2 = "https://www.googleapis.com/youtube/v3/videos?id=" + id +
            "&part=statistics&key=" + apikey;
    
            $.ajax({
                url: queryURL2,
                method: "GET"
            })
            .then(function (response2) {
                //console.log(JSON.stringify(response2));
                var views = response2.items[0].statistics.viewCount
                console.log(addCommas(views));
                var viewCount = addCommas(views);
                var viewCountP = "<p>Number of Views: " + viewCount + "</p>";
                $("#video" + i + "-1").html(viewCountP);
            });
}

function updateSideBar() {
    $("#fav-artist").empty();
    $("#search-history").empty();

    if (favArtistItem.artist !== "") {
        $("#fav-artist").append("<p>Favorite Artist:");
        $("#fav-artist").append("<h3>" + favArtistItem.artist + "</h3>");
        for (var j = 0; j < favArtistItem.top5videos.length; j++) {
            $("#fav-artist").append(favArtistItem.top5videos[j]);
        }
    }

    if (recentSearchList.length > 0) {
        $("#search-history").append("<p>5 Most Recent Searches:");
    }
    for (var i = 0; i < recentSearchList.length; i++) {
        $("#search-history").append("<h3>" + recentSearchList[i].artist + "</h3>");
        for (var j = 0; j < recentSearchList[i].top5videos.length; j++) {
            $("#search-history").append(recentSearchList[i].top5videos[j]);
        }
    }
}