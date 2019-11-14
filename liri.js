require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
const axios = require('axios');
var moment = require('moment');
moment().format();


spotify.search({ type: 'track', query: 'Bellyache' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[1]); 
  });



