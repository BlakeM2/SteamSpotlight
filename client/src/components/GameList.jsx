import React from "react";

function GameList(props) {  
    console.log(props)
    return (
        <div className="grid-gamelist">
            <ul>
                {Object.entries(props.gameList).map((game, index) => {
                    const hoursRecently = parseFloat(game[1].playtime_2weeks / 60).toPrecision(3);
                    const hoursTotal = parseFloat(game[1].playtime_forever / 60).toPrecision(4);
                    return (<li key={index}><img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game[1].appid}/${game[1].img_icon_url}.jpg`}></img><strong>{game[1].name}</strong>: {hoursRecently} hrs / {hoursTotal} hrs</li>)
                    })
                }
            </ul>
        </div>
    )
}

export default GameList;