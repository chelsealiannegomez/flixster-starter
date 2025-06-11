import MovieCard from "./MovieCard";
const DisplayFavorites = ( {movies} ) => {
    return (
        <div>
            <div className="movie-list">
            {
                movies.map(movie => 
                    (
                        <MovieCard key={movie.id} prop={movie} favoritePage={true}/>
                    )
                )
            }         
            </div>
        </div>
    )
}

export default DisplayFavorites;