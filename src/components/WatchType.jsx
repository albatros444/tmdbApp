import React from "react";

function WatchType({ fetchGenre, setTypeShowHidden }) {
  return (
    <div className="accordion__watchType">
      <ul>
        <li
          onClick={() => {
            fetchGenre("movie");
            setTypeShowHidden(true);
          }}
        >
          Movies
        </li>
        <li
          onClick={() => {
            fetchGenre("tv");
            setTypeShowHidden(true);
          }}
        >
          TVshows
        </li>
      </ul>
    </div>
  );
}

export default WatchType;
