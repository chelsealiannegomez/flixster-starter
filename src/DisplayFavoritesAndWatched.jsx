import MovieCard from "./MovieCard";
import './DisplayFavoritesAndWatched.css';

const DisplayFavoritesAndWatched = ( {movies, style, favoritesAndWatched} ) => {
    return (
        <div>
            <div className="movie-list" style={style}>
            {
                [...movies].map(movie => 
                    (
                        <MovieCard key={movie.id} prop={movie} favoritesAndWatched={favoritesAndWatched}/>
                    )
                )
            }         
            </div>
        </div>
    )
}

export default DisplayFavoritesAndWatched;