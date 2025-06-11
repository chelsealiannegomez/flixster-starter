import { useState } from 'react'
import './App.css'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';

const Home = () => {
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

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
      </header>
      <nav>
        {/* Favorite Bar (Favorites)*/}

      </nav>
      
      <form onSubmit={handleSearch}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <button type="submit">Search</button>
        <button type="button" onClick={clearInput}>Clear</button>
      </form>
      <button onClick={handleToggle}>Toggle</button>
      <MovieList mode={mode} searchQuery={submittedQuery} favorites={favorites} setFavorites={setFavorites}/>

      <footer>
        CodePath
      </footer>
    </div>
  )
}

export default Home;
