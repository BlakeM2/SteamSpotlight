import React, { useState } from "react";
import axios from "axios";

function SearchBar(props) {    
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e) {
        setSearchInput(e.target.value);
    }

    async function makeCall(e) {
        e.preventDefault();
        try {
          const response = await axios.get('http://localhost:3001/api', {
            params: {
              steamId: searchInput
            }
          });

          props.url(response.data[0].response.players[0].avatarfull);
          props.totalGameCount(response.data[1].response.game_count);
          props.recentGameCount(response.data[2].response.total_count);
          props.gamesList(response.data[2].response.games);

        } catch (error) {
          console.log(error.message);
        }
        setSearchInput("");
    }
    
    return (
      <form>
          <input id="search-bar" className="search-bar" type="text" onChange={handleChange} placeholder="SteamID or Profile URL " value={searchInput}></input>
          <input value="Lookup" className="search-button" type="button" onClick={makeCall}></input>
      </form>
    )
}

export default SearchBar;