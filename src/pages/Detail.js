import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import moment from "moment";

const Detail = ({ type }) => {
  let { movieId, tvId } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (type.toLowerCase() === "movie") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=5eb0ddc04f2b7e853cc4f375d3b22947`
        )
        .then((data) => {
          setData(data.data);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${tvId}?api_key=5eb0ddc04f2b7e853cc4f375d3b22947`
        )
        .then((data) => {
          setData(data.data);
        });
    }
  }, [movieId, tvId]);

  return (
    data && (
      <>
        <section
          style={{
            background: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}') rgba(0,0,0,0.7)`,
          }}
        >
          <div className="full-container">
            <div className="container">
              <div className="row">
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row internal-row">
              <div className="col-xl-3 col-lg-4 col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  alt={data.title ? data.title : data.name}
                  width="100%"
                  className="detail-img"
                />
              </div>
              <div className="col-md-8">
                <h1>
                  {data.title ? data.title : data.name} (
                  {moment(
                    data.release_date ? data.release_date : data.first_air_date
                  ).format("YYYY")}
                  )
                </h1>
                <p>
                  {moment(
                    data.release_date ? data.release_date : data.first_air_date
                  ).format("MMMM Do YYYY")}
                  {data.production_countries.length > 0 && (
                    <span> ({data.production_countries[0].iso_3166_1}) </span>
                  )}{" "}
                  &#x2022;
                  {data.genres.map((genre, index) => {
                    return (
                      <span key={index}>
                        {" "}
                        {genre.name}
                        {index === data.genres.length - 1 ? " " : ","}
                      </span>
                    );
                  })}
                  {type === "movie" && (
                    <span>
                      &#x2022; {Math.floor(data.runtime / 60)}hr{" "}
                      {Math.round(data.runtime) % 60}min{" "}
                    </span>
                  )}
                  &#x2022; <span>{data.status}</span>
                </p>
                <p>
                  <span className="vote-average">
                    {data.vote_average * 10}%
                  </span>{" "}
                  User Score
                </p>
                <h4>
                  <b>Overview</b>
                </h4>
                <p>{data.overview}</p>
                {type === "movie" && (
                  <p>
                    <b>Budget : </b>${data.budget} <b>,</b> <b>Revenue : </b>$
                    {data.revenue}
                  </p>
                )}

                {type === "tv" && (
                  <>
                    <p>
                      <b>Total Seasons : </b>
                      {data.number_of_seasons} <b>,</b> <b>Total Episodes : </b>
                      {data.number_of_episodes}
                    </p>
                  </>
                )}
                {type === "tv" && (
                  <>
                    <p>
                      <b>Last Air Date : </b>
                      {moment(data.last_air_date).format("MMMM Do YYYY")}
                      <b> , </b>
                      <b>Last Episode Name : </b>
                      {data.last_episode_to_air.name}
                    </p>
                    {data.next_episode_to_air && (
                      <p>
                        <b>Next Air Date : </b>
                        {moment(data.next_episode_to_air.air_date).format(
                          "MMMM Do YYYY"
                        )}
                        <b> , </b>
                        <b>Next Episode Name : </b>
                        {data.next_episode_to_air.name}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default Detail;
