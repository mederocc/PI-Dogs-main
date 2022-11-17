import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBreedsFromAPI,
  fetchTemperamentsFromAPI,
  getFilters,
} from "../actions";
import { Link } from "react-router-dom";
// import Card from "./Card";
import classes from "./Home.module.css";
import { sortAlphAsc } from "../actions/sorting_cbs/sortings";
import Cards from "./Cards/Cards";
import loadingDog from "./piq-loading.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  let temperaments = useSelector((state) => state.temperaments);
  const { source, temp, sorting } = useSelector((state) => state.filters);

  // const [sorting, setSorting] = useState("AtoZ");
  // const [temp, setTemp] = useState("all");
  // const [source, setSource] = useState("all");

  temperaments = temperaments.sort(sortAlphAsc);

  useEffect(() => {
    dispatch(fetchBreedsFromAPI({ source, temp, sorting }));
    dispatch(fetchTemperamentsFromAPI());
  }, [dispatch, source, temp, sorting]);

  const handleRefresh = () => {
    // setSource("all");
    // setTemp("all");
    // setSorting("AtoZ");
    dispatch(getFilters("all", "all", "AtoZ"));
    dispatch(
      fetchBreedsFromAPI({ source: "all", temp: "all", sorting: "AtoZ" })
    );
  };

  const handleSort = async (e) => {
    // setSorting(e.target.value);

    dispatch(getFilters(source, temp, e.target.value));

    dispatch(
      fetchBreedsFromAPI({
        source,
        temp,
        sorting: e.target.value,
      })
    );
  };

  const handleSource = (e) => {
    // setSource(e.target.value);
    dispatch(getFilters(e.target.value, temp, sorting));
    dispatch(fetchBreedsFromAPI({ source: e.target.value, temp, sorting }));
  };

  const handleTemper = (e) => {
    // setTemp(e.target.value);
    dispatch(getFilters(source, e.target.value, sorting));
    dispatch(fetchBreedsFromAPI({ source, temp: e.target.value, sorting }));
  };

  return (
    <>
      <h2>Get 'em dogs</h2>
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

        <select
          name="temperament"
          onChange={(e) => {
            handleTemper(e);
          }}
        >
          <option value="" selected disabled>
            Choose here
          </option>
          {temperaments.map((t) => (
            <option key={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {!allBreeds.length && !temperaments.length ? (
        <img alt="loading" src={loadingDog} />
      ) : (
        <>
          <Cards allBreeds={allBreeds} />
        </>
      )}
    </>
  );
};

export default Home;
