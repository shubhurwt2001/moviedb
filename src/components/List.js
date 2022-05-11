import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const List = ({ day, week, toggle, setToggle }) => {
  return (
    <>
      <div className="col-md-12 mt-5 mb-5">
        <div className="d-flex align-items-end toggle-head">
          <h3>TRENDING</h3>
          <div className="toggle">
            <button
              className={`btn btn-transparent btn-left ${
                toggle === "day" ? "active" : ""
              }`}
              onClick={() => setToggle("day")}
            >
              Day
            </button>
            <button
              className={`btn btn-transparent btn-right ${
                toggle === "week" ? "active" : ""
              }`}
              onClick={() => setToggle("week")}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      {day &&
        toggle === "day" &&
        day.results.map((movie, index) => {
          return (
            <div
              className="col-xl-2 col-lg-3 col-md-3 col-6 movie-item"
              key={index}
            >
              <Link to={`/${movie.media_type}/${movie.id}`}>
                <div className="inner-div">
                  <div className="shadow">
                    <h6>{movie.title ? movie.title : movie.name}</h6>
                    <p>{movie.overview.substring(0, 100)}...</p>
                    <span className="media_type">{movie.media_type}</span>
                    <p>
                      {moment(
                        movie.release_date
                          ? movie.release_date
                          : movie.first_air_date
                      ).format("MMMM Do YYYY")}
                    </p>
                    <div className="vote">
                      {movie.vote_average}
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title ? movie.title : movie.name}
                    width="100%"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      {week &&
        toggle === "week" &&
        week.results.map((movie, index) => {
          return (
            <div
              className="col-xl-2 col-lg-3 col-md-3 col-6 movie-item"
              key={index}
            >
              <Link to={`/${movie.media_type}/${movie.id}`}>
                <div className="inner-div">
                  <div className="shadow">
                    <h6>{movie.title ? movie.title : movie.name}</h6>
                    <p>{movie.overview.substring(0, 100)}...</p>
                    <span className="media_type">{movie.media_type}</span>
                    <p>
                      {moment(
                        movie.release_date
                          ? movie.release_date
                          : movie.first_air_date
                      ).format("MMMM Do YYYY")}
                    </p>
                    <div className="vote">
                      {movie.vote_average}
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title ? movie.title : movie.name}
                    width="100%"
                  />
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default List;
