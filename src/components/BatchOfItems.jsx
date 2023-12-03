import React, { useEffect, useRef, useState } from "react";

function BatchOfItems({
  shows,
  handleMovieTVshowClick,
  idOfGenre,
  fetchProp,
  batchPage,
  setBatchPage,
  isLoading,
  fetchShowsOnScroll,
}) {
  const ref = useRef(); /////for intersection observer
  const allBatchRef = useRef(); ///for scrolling to the top
  const [showId, setShowId] = useState(null);

  console.log("rerender");

  const titles = shows.map((show) => {
    return show.title;
  });
  console.log(
    "id of genre is",
    idOfGenre,
    "quantity",
    titles.length,
    titles[0],
    titles[titles.length - 1]
  );
  useEffect(() => {
    ////for scrolling to the top when genre changed
    allBatchRef.current.scrollTo(0, 0);
  }, [idOfGenre]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("observer sees intersection");
          console.log("id of genre", idOfGenre);
          if (idOfGenre !== "") {
            //to don't fetch when app starts and intersectionObserver triggers
            console.log("go fetch");
            fetchShowsOnScroll();
          }
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      console.log("observer starts observing");
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [batchPage]);

  return (
    <div ref={allBatchRef} className="accordion__batchOfItems">
      {/* batch and observer divs for infinite scrolling */}
      {shows?.map((show) => (
        <div className="boxForCard">
          <div
            className={
              showId === show.id ? "movieShowCard chosen" : "movieShowCard"
            }
            key={show.id}
            onClick={() => {
              handleMovieTVshowClick(
                show.title,
                show.overview,
                show.backdrop_path
                // movie.id,
                // "movie"
              );
              setShowId(show.id);
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
        </div>
      ))}

      <div ref={ref} className="observer">
        {/* loader */}
        <div
          className="lds-facebook"
          style={isLoading ? { display: "inline-block" } : { display: "none" }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default BatchOfItems;
