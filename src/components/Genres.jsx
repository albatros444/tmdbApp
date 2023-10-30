import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

function Genres({
  genres,
  fetchFunc,
  fetchProp,
  setTypeShowHidden,
  typeShowHidden,
  typeOfShow,
}) {
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
          {typeShowHidden && (
            <button
              onClick={() => {
                setTypeShowHidden(false);
              }}
            >
              <FiArrowLeft size="24" />
            </button>
          )}
          <h1>{typeOfShow}</h1>
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
