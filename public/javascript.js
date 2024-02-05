// prevent duplicate inputs
savedSteamUrl = null;

function submitForm(event) 
{
    event.preventDefault();
    
    steamUrl = event.target.elements.steamlink.value;
    
    // prevent duplicate inputs
    if (steamUrl == '' || steamUrl == savedSteamUrl) {
        return;
    }
    savedSteamUrl = event.target.elements.steamlink.value;

    // if user enters a steam URL, parse through the html and grab their steam ID
    if (steamUrl[0] != 7) {
        fetch('https://api.codetabs.com/v1/proxy?quest=' + steamUrl)
        .then(function (response) {
            switch (response.status) {
                case 200:
                    return response.text();
                case 404:
                    throw response;
            }
        })
        .then(function (template) {
            const re = new RegExp(/"steamid":"\d{17}/);
            const re2 = new RegExp(/\d{17}/);
            steamUrl = template.match(re);
            steamUrl = template.match(re2);
            //console.log(steamUrl)
            callbackend();
        })
        .catch(function (response) {
            console.log(response.statusText);
        });
    }
    else {
        callbackend();
    }
    
    // make requests to back-end server
    function callbackend() {
        // profile picture request
        fetch('http://localhost:5000/steamprofile', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                parcel: steamUrl
            }),
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data.response.players[0].avatarfull);
            document.getElementById('steam-profile').src = data.response.players[0].avatarfull;
            document.getElementById('steam-profile').classList.add('img-thumbnail');
            document.getElementById('userData').classList.add('data-background');
            document.getElementById('userName').textContent = 'Username: ' + data.response.players[0].personaname;
        })
        
        // recently played game count request
        fetch('http://localhost:5000/gamecount', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                parcel: steamUrl
            }),
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data.response.game_count);
            if (data.response.game_count == undefined) {
                data.response.game_count = "User's games are hidden"
            }
            document.getElementById('gamesOwned').textContent = 'Total games owned: ' + data.response.game_count;
        })

        // recently played games request
        fetch('http://localhost:5000/recentlyplayed', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                parcel: steamUrl
            }),
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data.response.total_count);
            document.getElementById('recentlyPlayedCount').textContent = '';
            document.getElementById('recentlyPlayed').innerText = '';
            if (data.response.total_count == undefined) {
                data.response.total_count = "User's games are hidden"
            }
            else {
                document.getElementById('recentlyPlayedCount').textContent = 'Total games recently played: ' + data.response.total_count;
                document.getElementById('recentlyPlayed').innerText = 'Games recently played:';
                for (let i = 0; i < data.response.games.length; i++) {
                document.getElementById('recentlyPlayed').innerText += "\r\n\r\n" + data.response.games[i].name;
                }
            }
        })
        .catch(err => console.log(err))
        return false;
    }
}