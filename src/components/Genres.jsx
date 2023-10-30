import React, { useState } from "react";

function Genres({ genres, fetchFunc, fetchProp, setTypeShowHidden }) {
  // console.log(genres);
  const [idOfGenre, setIdOfGenre] = useState("");
  const [] = useState();

  const handleClick = (genre) => {
    fetchFunc(fetchProp, genre.id);
    setIdOfGenre(genre.id);
  };
  return (
    <div className="accordion__genres">
      <ul>
        <div className="backToShowTypes">
          <button
            onClick={() => {
              setTypeShowHidden(false);
            }}
          >
            back
          </button>
          <h1>Movies</h1>
        </div>

        {genres?.map((genre) => (
          <div
            className={
              idOfGenre === genre.id
                ? "chosen genresItemContainer"
                : "genresItemContainer"
            }
            key={genre.id}
          >
            <img
              src={`/images/genres/${genre.name}.jpg`}
              alt=""
              onError={(event) => {
                event.target.src = "/images/genres/Default.jpg";
                event.onerror = null;
              }}
            />
            <li onClick={(event) => handleClick(genre)}>{genre.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
