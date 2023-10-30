import React from "react";

function WatchType({ fetchGenre, setTypeShowHidden, setTypeOfShow }) {
  return (
    <div className="accordion__watchType">
      <ul>
        <li
          onClick={() => {
            fetchGenre("movie");
            setTypeShowHidden(true);
            setTypeOfShow("Movies");
          }}
        >
          Movies
        </li>
        <li
          onClick={() => {
            fetchGenre("tv");
            setTypeShowHidden(true);
            setTypeOfShow("TV shows");
          }}
        >
          TVshows
        </li>
      </ul>
    </div>
  );
}

export default WatchType;
