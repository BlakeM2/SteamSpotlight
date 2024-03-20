# Steam Spotlight
Website that utilizes Steam's API to request information about a user's profile picture, amount of games owned, amount of games recently played, and specific games recently played and their recent / total hours using their Steam profile URL (e.g. https://steamcommunity.com/id/robinwalker) or their SteamID (e.g. 76561197960435530). Depending on the user's privacy settings some of this information may not be available.

Built using [Node.js](https://nodejs.org/en) and [React](https://react.dev/).

Install Node.js dependencies using ```npm i```

Initialize environment variable ```STEAM_API_KEY={YOUR_KEY}``` in backend/.env with your steam account's API key which can be found here: https://steamcommunity.com/dev

Both frontend and backend can be started using ```npm start```

Frontend server runs on ```localhost:3000```, backend server runs on ```localhost:3001```

![image of profile search results](https://i.imgur.com/940X4eU.png)