import { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';

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

const NowPlaying = ( {sortMovies, favoritesAndWatched} ) => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isDefault, setIsDefault] = useState(true); // By default, sortMovies is default (true)

    useEffect (() => {
        if (sortMovies === "Default" && !isDefault) {
            setIsDefault(true);
        }
        else if (sortMovies !== "Default") {
            setIsDefault(false);
        }
    })

    useEffect (() => {
        if (isDefault) {
        fetchData(page).then((result) => {
            setNowPlaying(result.results);
            setTotalPages(result.total_pages);
        })}
    }, [isDefault]);

    const addPage = (more) => {
        const newArray = [... nowPlaying, ...more]
        const uniqueArr = [...new Map(newArray.map(item => [item.id,item])).values()]
        setNowPlaying(uniqueArr);
    }

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchData(page + 1).then((result) => {
            addPage(result.results);
        })
    }
    
    return (
        <DisplayMovies movies={nowPlaying} setMovies={setNowPlaying} sortMovies={sortMovies} handleLoadMore={handleLoadMore} page={page} totalPages={totalPages} favoritesAndWatched={favoritesAndWatched}/>
    )
}

export default NowPlaying;