require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const axios = require('axios');
var moment = require('moment');
moment().format();

var action = process.argv[2]
var nodeArgs = process.argv;

var bandsInput = "";

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    bandsInput = bandsInput + "+" + nodeArgs[i];
  } else {
    bandsInput += nodeArgs[i];
  }
}

switch (action) {
  case "spotify-this-song":
    spotify();
    break;
  
  case "concert-this":
    concert();
    break;
  
  }

function spotify() {
spotify.search({ type: 'track', query: bandsInput }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    
  // console.log(data.tracks.items[0])
  console.log("------------------------------")
  console.log("Artist: "+ data.tracks.items[1].artists[0].name); 
  console.log("------------------------------")
  console.log("Song Title: " + data.tracks.items[1].name);
  console.log("------------------------------")
  console.log("Listen to the song: "+ data.tracks.items[1].external_urls.spotify)
  console.log("------------------------------")
  console.log("Album: " + data.tracks.items[1].album.name); 
  console.log("------------------------------")
  });
  }

function concert() {

  var queryURL = "https://rest.bandsintown.com/artists/" + bandsInput + "/events/" + "?app_id=test";
  console.log("------------------------------")
  console.log("Upcoming Events for " + bandsInput)
  console.log("------------------------------")
    axios.get(queryURL).then(
      function(response) {
        // var venuesAvailable = response
        // console.log(data)
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.data.data);
            console.log("---------------Status---------------");
            console.log(error.data.status);
            console.log("---------------Status---------------");
            console.log(error.data.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      
      }
  
  