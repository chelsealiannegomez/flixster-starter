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

const NowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [page, setPage] = useState(1);

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchData(page + 1).then((result) => {
            console.log(result);
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

    return (
        <div>
            <div className="movie-list">
            {
                nowPlaying.map(movie => {
                    return (
                        <MovieCard key={movie.id} prop={movie} />
                    )
                })
            }         
            </div>
            <button onClick={handleLoadMore}>Load more</button>   
        </div>
    )
}

export default NowPlaying;