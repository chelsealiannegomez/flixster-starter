import { useState } from 'react'
import './App.css'
import data from './data/data.js'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar';
import DisplayFavoritesAndWatched from './DisplayFavoritesAndWatched.jsx';

const App = () => {
  // Toggle Mode
  const [mode, setMode] = useState(0) // 0 = Default (Now Playing), 1 = Search Results

  const handleToggle = () => {
    setMode(mode === 0 ? 1 : 0);
  }

  // Handling of Search Query
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setMode(1);
    setSubmittedQuery(searchQuery);
  }

  const clearInput = (event) => {
    event.preventDefault();
    setMode(1);
    setSubmittedQuery("");
    setSearchQuery("");
    setMode(0);
  }

  // Display Favorite -> Get list of favorites, display with DisplayFavorites
  const [favorites, setFavorites] = useState([])
  const [allWatched, setAllWatched] = useState([])
  const [showHome, setShowHome] = useState({display: 'block'});
  const [showFavorites, setShowFavorites] = useState({display: 'none'});
  const [showWatched, setShowWatched] = useState({display: 'none'});

  const handleClickFavorites = () => {
    console.log("Display Favorites");
    setShowHome({display: 'none'});
    setShowWatched({display: 'none'});
    setShowFavorites({display: 'block'});
  }

  const handleClickWatched = () => {
    console.log("Display Watched");
    setShowHome({display: 'none'});
    setShowWatched({display: 'block'});
    setShowFavorites({display: 'none'});
  }

  const handleClickHome = () => {
    console.log("Display Home");
    setShowHome({display: 'block'});
    setShowWatched({display: 'none'});
    setShowFavorites({display: 'none'});
  }

  const favoritesAndWatched = {
    favorites: favorites, 
    setFavorites: setFavorites,
    allWatched: allWatched,
    setAllWatched: setAllWatched,
  };

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
      </header>
      <nav>
        <div onClick={handleClickFavorites}>Favorites</div>
        <div onClick={handleClickWatched}>Watched</div>
        <div onClick={handleClickHome}>Home</div>
      </nav>
      
      <div style={showHome}>
        <form onSubmit={handleSearch}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <button type="submit">Search</button>
          <button type="button" onClick={clearInput}>Clear</button>
        </form>
        <button onClick={handleToggle}>Toggle</button>
        <MovieList mode={mode} searchQuery={submittedQuery} favoritesAndWatched={favoritesAndWatched}/>
      </div>
      <DisplayFavoritesAndWatched movies={favorites} style={showFavorites}/> 
      <DisplayFavoritesAndWatched movies={allWatched} style={showWatched}/> 
      <footer>
        CodePath
      </footer>
    </div>
  )
}

export default App
