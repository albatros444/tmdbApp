import React, { useEffect } from "react";

function FilmOrShowDescr({ title, overview, backdrop, isLoading }) {
  return (
    <>
      <div
        className="accordion__filmOrShowDescr"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      >
        <div className="darkDiv">
          <div className="highBox"> </div>
          <div className="lowBox">
            <h1>{title}</h1>
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilmOrShowDescr;
