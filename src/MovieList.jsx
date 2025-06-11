import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import NowPlaying from "./NowPlaying"
import SearchResults from './SearchResults';
import './MovieList.css';
import DropDown from './DropDown';

const MovieList = ( { mode, searchQuery, favorites, setFavorites } ) => {
    // Handling of Sorting
    const [sortMovies, setSortMovies] = useState("default");

    return (
        <>
            <DropDown sortMovies={sortMovies} setSortMovies={setSortMovies}/>
            {mode === 0 ? <NowPlaying sortMovies={sortMovies} favorites={favorites} setFavorites={setFavorites}/> : <SearchResults searchQuery={searchQuery} sortMovies={sortMovies} favorites={favorites} setFavorites={setFavorites}/>}
        </>
    )
}

export default MovieList;