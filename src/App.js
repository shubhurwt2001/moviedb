import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

function App() {
  const [day, setDay] = useState(null);
  const [week, setWeek] = useState(null);
  const [toggle, setToggle] = useState("day");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
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
    if (toggle == "day") {
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
    <div className="container">
      <div className="row">
        <SearchBar
          search={search}
          handleChange={handleChange}
          results={results}
        />
        <List day={day} week={week} toggle={toggle} setToggle={setToggle} />
      </div>
      <Pagination
        data={toggle == "day" ? day : week}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default App;
