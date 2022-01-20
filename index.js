const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.set("view engine", "ejs");
app.use(express.static('public'))

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


app.get('/', (req, res) => {
    res.render(__dirname + "/views/home.ejs")
    console.log(spotifyApi)
})
app.get('/home', (req, res) => {
    res.render(__dirname + "/views/home.ejs")
})

const PORT = 1818
app.listen(PORT, () => console.log("Listening on Port", PORT))