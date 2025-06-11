import { useState, useEffect } from 'react';
import './MovieCard.css'

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
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
  }
}

const MovieCard = ( { prop } ) =>  {
    const [style, setStyle] = useState("closed-modal");
    const [genres, setGenres] = useState({});
    const [videoID, setVideoID] = useState(0);
    const [runtime, setRuntime] = useState("No runtime provided");

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
            setVideoID(result.videos.results[0].key);
            setRuntime((result.runtime).toString() + " minutes");
        })
    }, [prop])

    return (
        <div className="movie-card" onClick={openModal}>
            {/* <img className="movie-img" src={prop.backdrop_path}/> */}
            <img className="movie-img" src={"https://image.tmdb.org/t/p/w500/" + prop.poster_path}/>
            <h1>{prop.original_title}</h1>
            <p>Vote Average: {prop.vote_average}</p>
            <div className={style}>
                <div className="modal-content">
                    <img src={"https://image.tmdb.org/t/p/w500/" + prop.backdrop_path} alt={prop.original_title}/>
                    <p>{prop.original_title}</p>
                    <p>Release Date: {prop.release_date}</p>
                    <p>{prop.overview}</p>
                    <p>Genres: {getGenres(prop.genre_ids)}</p>
                    <p>Runtime: {runtime}</p>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;