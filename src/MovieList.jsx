import NowPlaying from "./NowPlaying"
import SearchResults from './SearchResults';

const MovieList = ( { mode, searchQuery, favoritesAndWatched, sortMovies } ) => {

    return (
        <>
            {mode === 0 ? <NowPlaying sortMovies={sortMovies} favoritesAndWatched={favoritesAndWatched}/> : <SearchResults searchQuery={searchQuery} sortMovies={sortMovies} favoritesAndWatched={favoritesAndWatched}/>}
        </>
    )
}

export default MovieList;