const express = require('express');
const router = express.Router();

//get API =========================================

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  // Retrieve an access token
spotifyApi
.clientCredentialsGrant()
.then(data => spotifyApi.setAccessToken(data.body['access_token']))
.catch(error => console.log('Something went wrong when retrieving an access token', error));

//==================================

router.get('/', (req, res, next) => {
    res.render('index');
})

//Create Route
router.get('/find', (req, res, next) => {
    console.log(req.query.artistSearch)
  
      spotifyApi
    .searchArtists(req.query.artistSearch)
    .then(data => {

        console.log('The received data from the API: ',  {images: data.body.artists.items[0].images[1]});

        let info = {
            artists: data.body.artists.items,
        }

      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.render(`artist-search-results`, info)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
  
  })

module.exports = router;