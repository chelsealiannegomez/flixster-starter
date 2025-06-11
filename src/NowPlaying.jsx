import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";

async function fetchData(page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
            }
        };
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
  }
}

const NowPlaying = ( {sortMovies} ) => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [page, setPage] = useState(1);

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchData(page + 1).then((result) => {
            addPage(result.results);
        })
    }

    useEffect (() => {
        fetchData(page).then((result) => {
            setNowPlaying(result.results);
        })
    }, [])

    const addPage = (more) => {
        setNowPlaying([... nowPlaying, ...more])
    }

    useEffect (() => {
        console.log("sort movies", sortMovies);
        if (sortMovies === "Sort By Title") {
            const prev = nowPlaying;
            prev.sort(function (a, b) {
                const textA = a.original_title.toLowerCase();
                const textB = b.original_title.toLowerCase();
                return (textA < textB) ? -1: (textA > textB) ? 1 : 0;
            })
            setNowPlaying(prev);
            console.log("sorted")
        } 
    }, [sortMovies])
    console.log(sortMovies)
    console.log(nowPlaying)
    
    return (
        <div>
            <div className="movie-list">
            {
                nowPlaying.map(movie => 
                    (
                        <MovieCard key={movie.id} prop={movie} />
                    )
                )
            }         
            </div>
            <button onClick={handleLoadMore}>Load more</button>   
        </div>
    )
}

export default NowPlaying;