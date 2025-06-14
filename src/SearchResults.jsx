import { useState, useEffect } from 'react';
import DisplayMovies from './DisplayMovies';
import './SearchResults.css';

async function fetchSearchData(query, page) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
            }
        };
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`;
    console.log(url);
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
  }
}

const DisplayResults = ( {query, sortMovies, favoritesAndWatched} ) => {
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchSearchData(query, page + 1).then((result) => {
            addPage(result.results);
        })
    }

    const addPage = (more) => {
        setSearchResults([... searchResults, ...more])
    }

    useEffect (() => {
        fetchSearchData(query, page).then((result) => {
            setSearchResults(result.results);
            setTotalPages(result.total_pages);
        })
    }, [query])

    if (searchResults.length === 0) {
        return (
            <div className="no-results">
                No movies to display
            </div>
        )
    }

    return (
        <DisplayMovies movies={searchResults} setMovies={setSearchResults} sortMovies={sortMovies} handleLoadMore={handleLoadMore} page={page} totalPages={totalPages} favoritesAndWatched={ favoritesAndWatched }/>
    )
}

const NoResults = () => {
    return (
        <div className="no-results">
            Type something in the search bar to search
        </div>
    )
}

const SearchResults = ( { searchQuery, sortMovies, favoritesAndWatched} ) => {
    return (
        <>
            {searchQuery !== "" ? <DisplayResults query={ searchQuery } sortMovies={ sortMovies } favoritesAndWatched={ favoritesAndWatched }/> : <NoResults />}
        </>
    )
}

export default SearchResults;