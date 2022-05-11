import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "../components/List";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [day, setDay] = useState(null);
  const [week, setWeek] = useState(null);
  const [toggle, setToggle] = useState("day");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=5eb0ddc04f2b7e853cc4f375d3b22947`
      )
      .then((data) => {
        setDay(data.data);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=5eb0ddc04f2b7e853cc4f375d3b22947`
      )
      .then((data) => {
        setWeek(data.data);
      });
  }, []);

  const handlePageClick = (data) => {
    if (toggle === "day") {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=5eb0ddc04f2b7e853cc4f375d3b22947&page=${
            data.selected + 1
          }`
        )
        .then((data) => {
          setDay(data.data);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=5eb0ddc04f2b7e853cc4f375d3b22947&page=${
            data.selected + 1
          }`
        )
        .then((data) => {
          setWeek(data.data);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <SearchBar />
        <List day={day} week={week} toggle={toggle} setToggle={setToggle} />
      </div>
      <Pagination
        data={toggle === "day" ? day : week}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default Home;
