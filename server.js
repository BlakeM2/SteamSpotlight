const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public'));
app.use(express.json());

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

steamKey = ''; // ENTER YOUR STEAM API KEY

app.post('/steamprofile', (req, res) => {
    steamId = req.body.parcel;
    axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + steamKey + '&steamids=' + steamId)
    .then(response => {
        const data = response.data
        res.json(data);
    })
    .catch(error => {
        console.log(error);
    });
})

//request recently played games amount
app.post('/gamecount', (req, res) => {
    steamId = req.body.parcel;
    axios.get('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + steamKey + '&steamid=' + steamId + '&format=json')
    .then(response => {
        const data = response.data
        res.json(data);
    })
    .catch(error => {
        console.log(error);
    });
})

//request recently played games
app.post('/recentlyplayed', (req, res) => {
    steamId = req.body.parcel;
    axios.get('https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + steamKey + '&steamid=' + steamId + '&format=json')
    .then(response => {
        const data = response.data
        res.json(data);
    })
    .catch(error => {
        console.log(error);
    });
})


// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});