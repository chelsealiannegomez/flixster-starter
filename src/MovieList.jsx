import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import './MovieList.css';

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

const MovieList = ( { movies } ) => {
    const [now_playing, setNowPlaying] = useState([]);
    const [page, setPage] = useState(1);

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchData(page + 1).then((result) => {
            console.log(result);
            addPage(result.results);
        })
    }

    const addPage = (more) => {
        setNowPlaying([... now_playing, ...more])
    }

    useEffect (() => {
        fetchData(page).then((result) => {
            setNowPlaying(result.results);
        })
    }, [])

    
    return (
        <div>
        <div className="movie-list">
        {
            now_playing.map(movie => {
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

export default MovieList;