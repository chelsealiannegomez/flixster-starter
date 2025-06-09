import { useState } from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import data from './data/data.js'
import MovieList from './MovieList.jsx'


const App = () => {
  const [pageNumber, setPageNumber] = useState(0);
  return (
    <div className="App">
      <h1>Flixster</h1>
      <MovieList movies={data.results} />
    </div>
  )
}

export default App
