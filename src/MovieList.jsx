import { useState, useEffect } from 'react';
import NowPlaying from "./NowPlaying"
import SearchResults from './SearchResults';
import './MovieList.css';
import DropDown from './DropDown';

const MovieList = ( { mode, searchQuery, favoritesAndWatched } ) => {
    // Handling of Sorting
    const [sortMovies, setSortMovies] = useState("default");

    return (
        <>
            <DropDown sortMovies={sortMovies} setSortMovies={setSortMovies}/>
            {mode === 0 ? <NowPlaying sortMovies={sortMovies} favoritesAndWatched={favoritesAndWatched}/> : <SearchResults searchQuery={searchQuery} sortMovies={sortMovies} favoritesAndWatched={favoritesAndWatched}/>}
        </>
    )
}

export default MovieList;