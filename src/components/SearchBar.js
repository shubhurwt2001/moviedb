import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length >= 2) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=5eb0ddc04f2b7e853cc4f375d3b22947&query=${event.target.value}`
        )
        .then((data) => {
          const getResults = data.data.results.filter((value, index) => {
            if (value.media_type === "tv" || value.media_type === "movie") {
              return true;
            }
          });
          data.data.results = getResults;
          setResults(data.data);
        });
    }
  };

  return (
    <div className="col-md-12 mt-3 mb-2">
      <div className="d-flex justify-content-between outer-search">
        <Link to={"/"}>
          <h2>
            <span>Movie</span>DB
          </h2>
        </Link>
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
            {results ? (
              results.results.length > 0 ? (
                results.results.map((result, index) => {
                  return (
                    <Link to={`/${result.media_type}/${result.id}`} key={index} onClick={() => setShow(!show)}>
                      <div className="search-item">
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
                    </Link>
                  );
                })
              ) : (
                <p className="mt-2 text-center">No results found</p>
              )
            ) : (
              <p className="mt-2 text-center">Start typing to search</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
