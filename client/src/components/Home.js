import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreedsFromAPI, fetchTemperamentsFromAPI } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import classes from "./Home.module.css";
import { sortAlphAsc } from "./sorting_cbs/sortings";

const Home = () => {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  let temperaments = useSelector((state) => state.temperaments);
  const [sorting, setSorting] = useState("AtoZ");
  const [temp, setTemp] = useState("all");
  const [source, setSource] = useState("all");

  temperaments = temperaments.sort(sortAlphAsc);

  useEffect(() => {
    dispatch(
      fetchBreedsFromAPI({ source: "all", temp: "all", sorting: "AtoZ" })
    );
    dispatch(fetchTemperamentsFromAPI());
  }, [dispatch]);

  const handleRefresh = () => {
    setSource("all");
    setTemp("all");
    setSorting("AtoZ");
    dispatch(
      fetchBreedsFromAPI({ source: "all", temp: "all", sorting: "AtoZ" })
    );
  };

  const handleSort = (e) => {
    setSorting(e.target.value);
    dispatch(
      fetchBreedsFromAPI({
        source,
        temp,
        sorting: e.target.value,
      })
    );

    for (let i in allBreeds) {
      console.log(allBreeds[i]);
    }
  };

  const handleSource = (e) => {
    setSource(e.target.value);
    dispatch(fetchBreedsFromAPI({ source: e.target.value, temp, sorting }));
  };

  const handleTemper = (e) => {
    setTemp(e.target.value);
    dispatch(fetchBreedsFromAPI({ source, temp: e.target.value, sorting }));
  };

  return (
    <>
      <h2>Pups be tripping 🐾 </h2>
      <Link to="/form">Add a new dog</Link>
      <br />
      <button onClick={handleRefresh}>Refresh list</button>
      <div>
        <label htmlFor="source">Get pups from: </label>
        <select
          onChange={(e) => {
            handleSource(e);
          }}
          name="source"
        >
          <option value="all">All</option>
          <option value="api">API only</option>
          <option value="submissions">My submissions</option>
        </select>
      </div>
      <div>
        <label htmlFor="order">Order by: </label>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
          name="order"
        >
          <option value="AtoZ">A to Z</option>
          <option value="ZtoA">Z to A</option>
          <option value="lightest">Lightest</option>
          <option value="heaviest">Heaviest</option>
        </select>
      </div>
      <div>
        <label htmlFor="temperament"> Temperament: </label>
        <span />
        {!temperaments.length ? (
          "Loading..."
        ) : (
          <select
            name="temperament"
            onChange={(e) => {
              handleTemper(e);
            }}
          >
            {temperaments.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
          </select>
        )}
      </div>

      {/*NOT filtered by temperament*/}

      <div className={classes.cards}>
        {allBreeds.length && allBreeds.map((b) => <Card key={b.id} dog={b} />)}
      </div>
    </>
  );
};

export default Home;
