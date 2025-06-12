import { useEffect } from 'react';
import MovieCard from "./MovieCard";

const DisplayMovies = ( { movies, setMovies, sortMovies, handleLoadMore, page, totalPages, favoritesAndWatched } ) => {
    useEffect (() => {
        if (sortMovies === "Sort By Title") {
            const prev = [...movies];
            prev.sort(function (a, b) {
                const textA = a.title.toLowerCase();
                const textB = b.title.toLowerCase();
                return (textA < textB) ? -1: (textA > textB) ? 1 : 0;
            })
            setMovies(prev);
        } 
        else if (sortMovies === "Sort By Release Date") {
            const prev = [...movies];
            prev.sort(function (a, b) {
                const textA = a.release_date;
                const textB = b.release_date;
                return (textA > textB) ? -1: (textA < textB) ? 1 : 0;
            })
            setMovies(prev);
        }

        else if (sortMovies === "Sort By Vote Average") {
            const prev = [...movies];
            prev.sort(function (a, b) {
                const textA = a.vote_average;
                const textB = b.vote_average;
                return (textA > textB) ? -1: (textA < textB) ? 1 : 0;
            })
            setMovies(prev);
        }
    }, [sortMovies, movies.length])

    return (
        <div>
            <div className="movie-list">
            {
                movies.map(movie => 
                    (
                        <MovieCard key={movie.id} prop={movie} favoritesAndWatched={favoritesAndWatched}/>
                    )
                )
            }         
            </div>
            <button onClick={handleLoadMore} style={{display: page < totalPages ? 'block' : 'none'}}>Load more</button>   
        </div>
    )
}

export default DisplayMovies;