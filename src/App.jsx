import { useState } from 'react'
import './App.css'
import data from './data/data.js'
import MovieList from './MovieList.jsx'
import SearchBar from './SearchBar';

const App = () => {
  const [mode, setMode] = useState(0) // 0 = Default (Now Playing), 1 = Search Results

  const handleToggle = () => {
    setMode(mode === 0 ? 1 : 0);
    console.log(mode);
  }

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

  console.log(mode);
  return (
    <div className="App">
      <h1>Flixster</h1>
      <form onSubmit={handleSearch}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <button type="submit">Search</button>
        <button type="button" onClick={clearInput}>Clear</button>
      </form>
      <button onClick={handleToggle}>Toggle</button>
      <MovieList mode={mode} movies={data.results} searchQuery={submittedQuery} />
    </div>
  )
}

export default App
