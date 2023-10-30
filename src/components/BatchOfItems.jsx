import React from "react";

function BatchOfItems({ shows, handleMovieTVshowClick }) {
  console.log(shows);

  return (
    <div className="accordion__batchOfItems">
      {shows?.map((show) => (
        <div
          className="movieShowCard"
          key={show.id}
          onClick={() => {
            handleMovieTVshowClick(
              show.title,
              show.overview,
              show.backdrop_path
              // movie.id,
              // "movie"
            );
          }}
        >
          <img
            src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt="movie"
          ></img>
          <div className="movieShowCard__description">
            <h1>{show.title || show.original_name}</h1>
            <p>Release date {show.release_date || show.first_air_date}</p>
            <p>Vote average {show.vote_average}</p>
            <p className="language">
              Original language <span>{show.original_language}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BatchOfItems;
