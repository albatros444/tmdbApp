import { useState } from "react";
import "./css/app.css";
import WatchType from "./components/WatchType";
import Genres from "./components/Genres";
import { options } from "./utilities/tmdbOptions";
import BatchOfItems from "./components/BatchOfItems";
import FilmOrShowDescr from "./components/FilmOrShowDescr";

function App() {
  const [movieGenres, setMovieGenres] = useState(null);
  const [TVshowGenres, setTVshowGenres] = useState(null);
  const [movies, setMovies] = useState(null);
  const [TVshows, setTVshows] = useState(null);
  const [nowOn, setNowOn] = useState(null);
  const [title, setTitle] = useState(null);
  const [overview, setOverview] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [typeShowHidden, setTypeShowHidden] = useState(false);

  const fetchGenre = async (genreType) => {
    fetch(
      `https://api.themoviedb.org/3/genre/${genreType}/list?language=en`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.genres);
        if (genreType === "movie") {
          setMovieGenres(response.genres);
          setNowOn("movie");
        } else if (genreType === "tv") {
          setTVshowGenres(response.genres);
          setNowOn("TV");
        }
      })
      .catch((err) => console.error(err));
  };

  const fetchShows = (showType, genreN) => {
    fetch(
      `https://api.themoviedb.org/3/discover/${showType}?&language=en-US&with_genres=${genreN}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (showType === "movie") {
          setMovies(res.results);
        } else if (showType === "tv") {
          setTVshows(res.results);
        }
        setTitle("");
        setOverview("");
        setBackdrop("");
      })
      .catch((err) => console.error(err));
  };

  const handleMovieTVshowClick = (title, overview, backdrop, id, show) => {
    setTitle(title);
    setOverview(overview);
    setBackdrop(`http://image.tmdb.org/t/p/w1280/${backdrop}`);
    // fetch(`https://api.themoviedb.org/3/${show}/${id}?`, options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div
        className="accordion"
        style={typeShowHidden ? { marginLeft: "-110px" } : {}}
      >
        <WatchType
          fetchGenre={fetchGenre}
          setTypeShowHidden={setTypeShowHidden}
        />
        {nowOn === "movie" && (
          <Genres
            genres={movieGenres}
            fetchFunc={fetchShows}
            fetchProp="movie"
            setTypeShowHidden={setTypeShowHidden}
          />
        )}
        {nowOn === "TV" && (
          <Genres
            genres={TVshowGenres}
            fetchFunc={fetchShows}
            fetchProp="tv"
            setTypeShowHidden={setTypeShowHidden}
          />
        )}
        <div className="accordion__batchOfItems">
          {nowOn === "movie" && (
            <BatchOfItems
              shows={movies}
              handleMovieTVshowClick={handleMovieTVshowClick}
            />
          )}
          {nowOn === "TV" && (
            <BatchOfItems
              shows={TVshows}
              handleMovieTVshowClick={handleMovieTVshowClick}
            />
          )}
        </div>
        <FilmOrShowDescr
          title={title}
          overview={overview}
          backdrop={backdrop}
        />
      </div>
    </div>
  );
}

export default App;
