import React from "react";

function TotalGames(props) {
    return (
        <div className="grid-total-games">
            <div className="total-games">
                <p className="games-number"><strong>{props.gameCount}</strong></p>
                <p>games owned</p>
            </div>
        </div>
    )
}

export default TotalGames;