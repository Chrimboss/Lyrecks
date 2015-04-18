// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var rest = require('restler');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });   
    var first_response = res;
    var track_name = "Drone";
    var art_name = "Muse";
    console.log("got here 2");
    rest.json('http://api.musixmatch.com/ws/1.1/track.search?q=' + track_name + '&q_artist=' + art_name + ' &f_has_lyrics=1&apikey=36238a5e7169c1acedc538f970fffb34')
    .on('complete', function(response_track) { 
        console.log("got here 1");
    //console.log(response); 
    var json_track_info = JSON.parse(response_track);
    //console.log(json_track_info.message.body.track_list[0].track_rating);
     //var second_response = "doing something" . reponse;
        var track_id = json_track_info.message.body.track_list[0].track.track_id;
        // console.log(json_track_info);
     	rest.json('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + track_id + '&apikey=36238a5e7169c1acedc538f970fffb34')
            .on('complete', function(response_2){
            var lyrics = JSON.parse(response_2).message.body.lyrics.lyrics_body;
            
            console.log(lyrics);
            first_response.send("" + lyrics);
     	});
         
        
     	
	})
	.on('error', function(err) { 
	      console.log('An error occurred:' + err); 
	 });
});

//async
//angular/react
//jquery

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);