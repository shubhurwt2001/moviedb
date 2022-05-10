import React, { useState } from "react";
const SearchBar = ({ search, handleChange, results }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="col-md-12 mt-3">
      <div className="d-flex justify-content-between outer-search">
        <h2>
          <span>Movie</span>DB
        </h2>
        <button
          className="searchBtn"
          type="button"
          onClick={() => setShow(!show)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {show && (
        <div className="search-box">
          <div className="upper mt-2 col-12 d-flex align-items-center">
            <input
              type="text"
              className="form-control"
              id="search"
              value={search}
              onChange={(e) => handleChange(e)}
              placeholder="search..."
            />
            <i className="fa-solid fa-xmark" onClick={() => setShow(!show)}></i>
          </div>

          <div className="col-12 mt-3 searchList">
            {results
              ? results.results.length > 0
                ? results.results.map((result, index) => {
                    return (
                      <div className="search-item" key={index}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                          alt={result.title ? result.title : result.name}
                          width="40"
                        />
                        <div>
                          <p>{result.title ? result.title : result.name}</p>
                          <p>{result.overview.substring(0, 50)}...</p>
                        </div>
                      </div>
                    );
                  })
                : <p className="mt-2 text-center">No results found</p>
              : <p className="mt-2 text-center">Start typing to search</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
