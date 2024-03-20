import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3001;

// configure cors to allow frontend @ localhost:3000 to make requests to backend
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

let steamId = '';

app.get('/api', async (req, res) => {
    steamId = req.query.steamId;

    // if steamURL is inputted instead of simply a steamID
    if (steamId[0] != 7) {
        const re = new RegExp(/"steamid":"\d{17}/);
        const re2 = new RegExp(/\d{17}/);
        const response = await axios.get(steamId);
        steamId = response.data.match(re);
        steamId = response.data.match(re2);
        steamId = steamId[0];
    };

    const endpoints = [
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`,
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`,
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
    ];

    let data = [];

    // make Steam API requests 
    try {
        await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(axios.spread((...responses) => {
            responses.forEach(res => data.push(res.data));
        }));
        res.send(data)
    } catch (error) {
        console.log(error.message);
    }
    
})

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});