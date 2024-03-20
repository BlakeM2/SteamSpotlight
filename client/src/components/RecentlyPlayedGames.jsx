import React from "react";

function recentlyPlayed(props) {
    return (
        <div className="grid-recently-played">
            <div className="recently-played">
                <p className="games-number"><strong>{props.gameCount}</strong></p>
                <p>games recently played</p>
            </div>
        </div>
    )
} 

export default recentlyPlayed;