import MovieCard from "./MovieCard";
import './DisplayFavoritesAndWatched.css';
const DisplayFavoritesAndWatched = ( {movies, style} ) => {
    return (
        <div>
            <div className="movie-list" style={style}>
            {
                movies.map(movie => 
                    (
                        <MovieCard key={movie.id} prop={movie}/>
                    )
                )
            }         
            </div>
        </div>
    )
}

export default DisplayFavoritesAndWatched;