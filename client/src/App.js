import React, {useState} from "react"
import './App.css';
import SearchBar from "./components/SearchBar";
import ProfilePicture from "./components/ProfilePicture";
import RecentlyPlayedGames from "./components/RecentlyPlayedGames";
import TotalGames from "./components/TotalGames";
import GameList from "./components/GameList";

function App() {
  const [url, setURL] = useState("");
  const [totalGameCount, setTotalGameCount] = useState("");
  const [recentGameCount, setRecentGameCount] = useState("");
  const [gameList, setGameList] = useState([]);
  
  function addProfilePicture(avatarURL) {
    setURL(avatarURL);
  }

  function addTotalGameCount(gameCount) {
    setTotalGameCount(gameCount);
  }

  function addRecentGameCount(gameCount) {
    setRecentGameCount(gameCount);
  }

  function addGamesList(gamesList) {
    setGameList([])
    gamesList.map((game, index) => {
      setGameList((prevState) => ({
        ...prevState,
        [index]: game
      }))
    })
  }

  return (
    <div className="App grid-container">
      <SearchBar url={addProfilePicture} totalGameCount={addTotalGameCount} recentGameCount={addRecentGameCount} gamesList={addGamesList}/>
      { url ? (<ProfilePicture url={url} />) : null }
      { totalGameCount ? (<TotalGames gameCount={totalGameCount}/>) : null }
      { recentGameCount ? (<RecentlyPlayedGames gameCount={recentGameCount} />) : null }
      { Object.keys(gameList).length > 0 ? (<GameList gameList={gameList} />) : null }
    </div>
  );
}

export default App;
