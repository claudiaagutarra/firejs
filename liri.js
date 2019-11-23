require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const axios = require('axios');
var moment = require('moment');
moment().format();

var action = process.argv[2]
var nodeArgs = process.argv;

var input = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    input = input + "+" + nodeArgs[i];
  } else {
    input += nodeArgs[i];
  }
}


switch (action) {
  case "spotify-this-song":
    spotifysong();
    break;

  case "concert-this":
    concert();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function spotifysong() {
  var spotify = new Spotify(keys.spotify);
  if (input === "") {
    input = "The Sign Ace"
  }
  spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
      console.log("------------------------------")
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("------------------------------")
      console.log("Song Title: " + data.tracks.items[0].name);
      console.log("------------------------------")
      console.log("Listen to the song: " + data.tracks.items[0].external_urls.spotify)
      console.log("------------------------------")
      console.log("Album: " + data.tracks.items[0].album.name);
     
  });
}


function concert() {
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events/" + "?app_id=test";
    console.log("------------------------------")
    console.log("Upcoming Events for " + input)
    console.log("------------------------------")
    axios.get(queryURL).then(
      function(response) {
        response.data.forEach(function(data) {
          var venueCity = data.venue.city;
          var venueState = data.venue.region;
          var venueCountry = data.venue.country;
          var nameVenue = data.venue.name;
          var date = data.datetime;
          console.log(nameVenue)
          console.log(venueCity + ", " + venueState + " " +venueCountry)
          console.log(date)
          console.log("------------------------------")
        });
      })
      .catch(function(error) {
        if (error.data) {
          console.log("---------------Data---------------");
          console.log("---------------Status---------------");
          console.log("---------------Status---------------");
          console.log(error.data.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    }




function movie() {
  if (input === "") {
    input = "Mr Nobody"
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function (response) {
      console.log("------------------------------")
      console.log("Title: " + response.data.Title);
      console.log("------------------------------")
      console.log("Release Year: " + response.data.Year);
      console.log("------------------------------")
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("------------------------------")
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("------------------------------")
      console.log("Produced in: " + response.data.Country);
      console.log("------------------------------")
      console.log("Language: " + response.data.Language);
      console.log("------------------------------")
      console.log("Plot: " + response.data.Plot);
      console.log("------------------------------")
      console.log("Actors: " + response.data.Actors);
      console.log("------------------------------")
    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });


}

function doWhatItSays() {
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(" ");
    for (var i = 0; i < data.length; i++) {
    nodeArgs.push(data[i])
    }

    action = nodeArgs[3]
    input = "";
    for (var i = 4; i < nodeArgs.length; i++) {
    
      if (i > 4 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
      } else {
        input += nodeArgs[i];
      }
    }

    switch (action) {
      case "spotify-this-song":
        spotifysong();
        break;
    
      case "concert-this":
        concert();
        break;
    
      case "movie-this":
        movie();
        break;
    }
    
})
}