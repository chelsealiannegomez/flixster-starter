import MovieCard from "./MovieCard";
import './MovieList.css';

const MovieList = ( {movies} ) => {
    return (
        <div className="movie-list">
        {
            movies.map(movie => {
                return (
                    <MovieCard key={movie.original_title} prop={movie} />
                )
            })
        }            
        </div>
    )
}

export default MovieList;