import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import NowPlaying from "./NowPlaying"
import SearchResults from './SearchResults';
import './MovieList.css';

const MovieList = ( { mode, movies, searchQuery } ) => {
    return (
        <>
            <button>Sort</button>
            {mode === 0 ? <NowPlaying /> : <SearchResults searchQuery={searchQuery}/>}
        </>
    )
}

export default MovieList;