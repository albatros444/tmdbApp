import { useCallback, useState } from "react";
import "./css/app.css";
import WatchType from "./components/WatchType";
import Genres from "./components/Genres";
import { options } from "./utilities/tmdbOptions";
import BatchOfItems from "./components/BatchOfItems";
import FilmOrShowDescr from "./components/FilmOrShowDescr";

function App() {
  const [movieGenres, setMovieGenres] = useState(null);
  const [TVshowGenres, setTVshowGenres] = useState(null);
  const [movies, setMovies] = useState([]);
  const [TVshows, setTVshows] = useState([]);
  const [nowOn, setNowOn] = useState(null);
  const [title, setTitle] = useState(null);
  const [overview, setOverview] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [typeShowHidden, setTypeShowHidden] = useState(false);
  const [typeOfShow, setTypeOfShow] = useState();
  const [idOfGenre, setIdOfGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchPage, setBatchPage] = useState(1);

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

  const fetchShows = async (showType, genreN, batchPage) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${showType}?&language=en-US&with_genres=${genreN}`,
        options
      );
      const res = await response.json();
      if (showType === "movie") {
        setMovies(res.results);
      } else if (showType === "tv") {
        setTVshows(res.results);
      }
      setBatchPage(2);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
    //  setTitle("");
    //  setOverview("");
    //  setBackdrop("");
  };

  //////////////////////////////////////
  const fetchShowsOnScroll = async () => {
    setIsLoading(true);
    console.log("fetchShoesOnScroll goes");
    // console.log(batchPage, typeOfShow, idOfGenre);
    try {
      let type;
      if (typeOfShow === "Movies") {
        type = "movie";
      } else if (typeOfShow === "TV shows") {
        type = "tv";
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?&language=en-US&with_genres=${idOfGenre}&page=${batchPage}`,
        options
      );
      const res = await response.json();
      if (typeOfShow === "Movies") {
        setMovies((prev) => [...prev, ...res.results]);
      } else if (typeOfShow === "TV shows") {
        setTVshows((prev) => [...prev, ...res.results]);
      }
      setBatchPage((prev) => prev + 1);
    } catch (error) {
      setError(error);
    } finally {
      // console.log(isLoading);
      setIsLoading(false);
    }
    //  setTitle("");
    //  setOverview("");
    //  setBackdrop("");
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
          setTypeOfShow={setTypeOfShow}
        />
        {nowOn === "movie" && (
          <Genres
            genres={movieGenres}
            fetchFunc={fetchShows}
            fetchProp="movie"
            setTypeShowHidden={setTypeShowHidden}
            typeShowHidden={typeShowHidden}
            typeOfShow={typeOfShow}
            setIdOfGenre={setIdOfGenre}
            idOfGenre={idOfGenre}
            batchPage={batchPage}
          />
        )}
        {nowOn === "TV" && (
          <Genres
            genres={TVshowGenres}
            fetchFunc={fetchShows}
            fetchProp="tv"
            setTypeShowHidden={setTypeShowHidden}
            typeShowHidden={typeShowHidden}
            typeOfShow={typeOfShow}
            batchPage={batchPage}
          />
        )}

        {nowOn === "movie" && (
          <BatchOfItems
            shows={movies}
            handleMovieTVshowClick={handleMovieTVshowClick}
            idOfGenre={idOfGenre}
            fetchProp="movie"
            batchPage={batchPage}
            setBatchPage={setBatchPage}
            isLoading={isLoading}
            fetchShowsOnScroll={fetchShowsOnScroll}
          />
        )}
        {nowOn === "TV" && (
          <BatchOfItems
            shows={TVshows}
            handleMovieTVshowClick={handleMovieTVshowClick}
            idOfGenre={idOfGenre}
            fetchProp="tv"
            batchPage={batchPage}
            setBatchPage={setBatchPage}
            isLoading={isLoading}
            fetchShowsOnScroll={fetchShowsOnScroll}
          />
        )}

        <FilmOrShowDescr
          title={title}
          overview={overview}
          backdrop={backdrop}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
