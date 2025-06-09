import './MovieCard.css'

const MovieCard = ( {prop} ) =>  {
    return (
        <div className="movie-card">
            {/* <img className="movie-img" src={prop.backdrop_path}/> */}
            <img className="movie-img" src="/movie.png"/>
            <h1>{prop.original_title}</h1>
            <p>Vote Average: {prop.vote_average}</p>
        </div>
    )
}
export default MovieCard;