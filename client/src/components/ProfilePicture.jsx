import React from "react";

function ProfilePicture(props) {
    return (
        <div className="profile-picture">
            <img className="rounded-image" src={props.url}></img>
        </div>
    )
}

export default ProfilePicture;