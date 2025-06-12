import { useState } from 'react'
import './App.css'
import data from './data/data.js'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar';
import DisplayFavoritesAndWatched from './DisplayFavoritesAndWatched.jsx';
import DropDown from './DropDown';

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

  // Display Favorites and Watched -> Get list of favorites and watched, display with DisplayFavoritesAndWatched
  const [favorites, setFavorites] = useState([])
  const [allWatched, setAllWatched] = useState([])
  const [showHome, setShowHome] = useState({display: 'block'});
  const [showFavorites, setShowFavorites] = useState({display: 'none'});
  const [showWatched, setShowWatched] = useState({display: 'none'});

  const handleClickFavorites = () => {
    setShowHome({display: 'none'});
    setShowWatched({display: 'none'});
    setShowFavorites({display: 'flex'});
  }

  const handleClickWatched = () => {
    setShowHome({display: 'none'});
    setShowWatched({display: 'flex'});
    setShowFavorites({display: 'none'});
  }

  const handleClickHome = () => {
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

  const [sortMovies, setSortMovies] = useState("Default");

  return (
    <div className="App">
      <header>
        <h1>Flixster 📹</h1>
      </header>
      <div className="body">
        <nav className="side-nav">
              <div onClick={handleClickHome} className="home">Home</div>
              <div onClick={handleClickFavorites} className="favorites">Favorites</div>
              <div onClick={handleClickWatched} className="watched">Watched</div>
        </nav>

        <div className="body-content">
          <div style={showHome}>
            <div className="top-options">
              <form onSubmit={handleSearch}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button type="submit">Search</button>
                <button type="button" onClick={clearInput}>Clear</button>
              </form>
              <button onClick={handleToggle} className="toggle">Toggle</button>
              <DropDown sortMovies={sortMovies} setSortMovies={setSortMovies}/>
            </div>
            <MovieList mode={mode} searchQuery={submittedQuery} favoritesAndWatched={favoritesAndWatched} sortMovies={sortMovies}/>
          </div>
          <DisplayFavoritesAndWatched movies={favorites} favoritesAndWatched={favoritesAndWatched} style={showFavorites}/> 
          <DisplayFavoritesAndWatched movies={allWatched} favoritesAndWatched={favoritesAndWatched} style={showWatched}/> 
        </div>

      
      </div>
      <footer>
        Developed by: Chelsea Lianne Gomez 2025
      </footer>
    </div>
  )
}

export default App
