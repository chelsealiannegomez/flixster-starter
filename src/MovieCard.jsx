import { useState, useEffect } from 'react';
import './MovieCard.css'
import heart from './assets/heart.png';
import redHeart from './assets/red_heart.png';
import watched from './assets/watched.png';
import notWatched from './assets/not_watched.png';
import poster from './assets/poster.png'

async function fetchGenres() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
            }
        };
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
  }
}

async function fetchVideoID(movie_id) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
            }
        };
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos&api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
  }
}

const MovieCard = ( { prop, favoritesAndWatched } ) =>  {
    const [style, setStyle] = useState("closed-modal");
    const [genres, setGenres] = useState({});
    const [videoID, setVideoID] = useState(0);
    const [runtime, setRuntime] = useState("No runtime provided");

    const [isWatched, setIsWatched] = useState(false);

    const [isFavorite, setIsFavorite] = useState(favoritesAndWatched?.favorites.some(item => item.id === prop.id) || false);

    const openModal = () => {
        setStyle(style === "open-modal" ? "closed-modal" : "open-modal")
    }

    const closeModal = () => {
        setStyle(style === "open-modal" ? "closed-modal" : "open-modal")
    }

    useEffect (() => {
        fetchGenres().then((result) => {
            setGenres(result.genres);
        })
    }, [prop])

    const findGenre = (targetID) => {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].id === targetID) {
                return genres[i].name;
            }
        }
    }

    const getGenres = (genre_ids) => {
        let genres = "";
        for (let i = 0; i < genre_ids.length; i++) {
            genres += findGenre(genre_ids[i]);
            
            if (i != genre_ids.length - 1) {
                genres += ", "
            }
        }
        return genres;
    }

    useEffect (() => {
        fetchVideoID(prop.id).then((result) => {
            if (result.videos.results.length !== 0) {
                setVideoID(result.videos.results[0].key);
            }
            setRuntime((result.runtime).toString() + " minutes");
        })
    }, [prop])

    const handleFavorite = (e) => {
        e.stopPropagation();

        const isAlreadyFavorite = favoritesAndWatched?.favorites?.some(item => item.id === prop.id);
        if (!isAlreadyFavorite) {
            const newFavorites = [...favoritesAndWatched.favorites];
            newFavorites.push(prop);
            favoritesAndWatched.setFavorites(newFavorites);
        }
        else {
            const newFavorites = favoritesAndWatched.favorites.filter(item => item.id !== prop.id);
            favoritesAndWatched.setFavorites(newFavorites);
        }
    }  

    const handleWatched = (e) => {
        e.stopPropagation();
        if (!isWatched) {
            const newWatched = [...favoritesAndWatched.allWatched];
            newWatched.push(prop);
            favoritesAndWatched.setAllWatched(newWatched);
        }
        else {
            const newWatched = [...favoritesAndWatched.allWatched];
            newWatched.splice(newWatched.findIndex(item => item === prop), 1);
            favoritesAndWatched.setAllWatched(newWatched);
        }
        setIsWatched(!isWatched);
    }  

    useEffect (() => {
        setIsFavorite(favoritesAndWatched?.favorites.some(item => item.id === prop.id) || false);
        console.log("favorites", favoritesAndWatched);
    }, [favoritesAndWatched])

    return (
        <div className="movie-card" onClick={openModal}>
            {/* Grid Content */}
            <div>
                <img className="movie-img" src={prop.poster_path ? "https://image.tmdb.org/t/p/w500/" + prop.poster_path : poster} alt={prop.title}/>
                <h1>{prop.title}</h1>
                <p>Vote Average: {prop.vote_average}</p>
                <img className="heart" src={isFavorite ? redHeart : heart} onClick={(e) => {handleFavorite(e)}}/>
                <img className="heart" src={isWatched ? watched : notWatched} onClick={(e) => {handleWatched(e)}}/>
            </div> 

            {/* Modal Content */}
            <div className={style}>
                <div className="modal-content">
                    <img src={prop.backdrop_path ? "https://image.tmdb.org/t/p/w500/" + prop.backdrop_path : poster} alt={prop.title} class="backdrop"/>
                    <h1>{prop.title}</h1>
                    <p><b>Release Date:</b> {prop.release_date}</p>
                    <p>{prop.overview}</p>
                    <p><b>Genres:</b> {getGenres(prop.genre_ids)}</p>
                    <p><b>Runtime:</b> {runtime}</p>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;