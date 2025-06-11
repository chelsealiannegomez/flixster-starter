import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import NowPlaying from "./NowPlaying"
import SearchResults from './SearchResults';
import DropDown from './Dropdown';
import './MovieList.css';

const MovieList = ( { mode, searchQuery } ) => {
    // Handling of Sorting
    const [sortMovies, setSortMovies] = useState("default");

    return (
        <>
            <DropDown sortMovies={sortMovies} setSortMovies={setSortMovies}/>
            {mode === 0 ? <NowPlaying sortMovies={sortMovies} /> : <SearchResults searchQuery={searchQuery} sortMovies={sortMovies}/>}
        </>
    )
}

export default MovieList;