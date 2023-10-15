import { useEffect, useState } from "react";

function App() {
  const [genres, setGenres] = useState(null);
  const [movies, setMovies] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjdjNzkwZmVkNTI4ZTQ2YzE5YTE1OTg4NWI1Yjc1OSIsInN1YiI6IjY1MjMwMjgzYjNmNmY1MDEzOTMyZThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VAtPOlmzxoYso6wvi9rCS3dTlCAiIevp4J1aSt5p2gk",
    },
  };
  useEffect(() => {
    const fetchGenre = async () => {
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setGenres(response.genres);
        })
        .catch((err) => console.error(err));
    };
    fetchGenre();
  }, []);

  const fetchMovies = (genreN) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?&language=en-US&with_genres=${genreN}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setMovies(res.results);
      })
      .catch((err) => console.error(err));
  };

  // movies?.forEach((movie) => {
  //   console.log(movie.backdrop_path)
  // })
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: "15px" }}>
          {genres?.map((genre) => (
            <button
              style={{ marginRight: "10px" }}
              onClick={() => fetchMovies(genre.id)}
              key={genre.name}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <div>
          {movies?.map((movie) => (
            <img
              src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt="kdjlsk"
            ></img>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
