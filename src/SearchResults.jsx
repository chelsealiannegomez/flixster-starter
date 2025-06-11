import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";

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

const DisplayResults = ( {query} ) => {
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    console.log("search query", query)

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchSearchData(query, page + 1).then((result) => {
            console.log(`query: ${query}`);
            console.log(query);
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
            console.log(query, result);
        })
    }, [query])

    if (searchResults.length === 0) {
        return (
            <div>
                No movies to display
            </div>
        )
    }
    console.log(page < totalPages);
    return (
        <div>
            <div className="movie-list">
            {
                searchResults.map(movie => {
                    return (
                        <MovieCard key={movie.id} prop={movie} />
                    )
                })
            }         
            </div>
            <button onClick={handleLoadMore} style={{display: page < totalPages ? 'block' : 'none'}}>Load more</button>   
        </div>
    )
}

const NoResults = () => {
    return (
        <div>
            Type something in the search bar to search
        </div>
    )
}

const SearchResults = ( { searchQuery } ) => {
    return (
        <>
            {searchQuery !== "" ? <DisplayResults query={ searchQuery }/> : <NoResults />}
        </>
    )
}

export default SearchResults;