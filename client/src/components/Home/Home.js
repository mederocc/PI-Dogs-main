import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBreedsFromAPI,
  fetchTemperamentsFromAPI,
  getFilters,
} from "../../actions";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { sortAlphAsc } from "../../actions/sorting_cbs/sortings";
import Cards from "../Cards/Cards";
import loadingDog from "../utils/piq-loading.gif";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  let temperaments = useSelector((state) => state.temperaments);
  const [selectDefault, setSelectDefault] = useState("DEFAULT");
  const { source, temp, sorting } = useSelector((state) => state.filters);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pupsPerPage = 8;

  // const [sorting, setSorting] = useState("AtoZ");
  // const [temp, setTemp] = useState("all");
  // const [source, setSource] = useState("all");

  temperaments = temperaments.sort(sortAlphAsc);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchBreedsFromAPI({ source, temp, sorting }));
    dispatch(fetchTemperamentsFromAPI());
    setIsLoading(false);
  }, [dispatch, source, temp, sorting]);

  const handleRefresh = () => {
    // setSource("all");
    // setTemp("all");
    // setSorting("AtoZ");
    setIsLoading(true);
    dispatch(getFilters("all", "all", "AtoZ"));
    dispatch(
      fetchBreedsFromAPI({ source: "all", temp: "all", sorting: "AtoZ" })
    );
    setSelectDefault("DEFAULT");
    setIsLoading(false);
  };

  const handleSort = (e) => {
    // setSorting(e.target.value);
    setIsLoading(true);
    dispatch(getFilters(source, temp, e.target.value));

    dispatch(
      fetchBreedsFromAPI({
        source,
        temp,
        sorting: e.target.value,
      })
    );
    setIsLoading(false);
  };

  const handleSource = (e) => {
    // setSource(e.target.value);
    setIsLoading(true);
    dispatch(getFilters(e.target.value, temp, sorting));
    dispatch(fetchBreedsFromAPI({ source: e.target.value, temp, sorting }));
    setIsLoading(false);
  };

  const handleTemper = (e) => {
    // setTemp(e.target.value);
    setIsLoading(true);
    dispatch(getFilters(source, e.target.value, sorting));
    dispatch(fetchBreedsFromAPI({ source, temp: e.target.value, sorting }));
    setIsLoading(false);
  };

  // Get current dogs

  const indexOfLastPup = currentPage * pupsPerPage;
  const indexOfFirstPup = indexOfLastPup - pupsPerPage;
  const currentPups = allBreeds.slice(indexOfFirstPup, indexOfLastPup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginatePrev = (prevPage) => setCurrentPage(prevPage);

  const paginateNext = (nextPage) => setCurrentPage(nextPage);

  return (
    <>
      <h2>Get 'em dogs</h2>
      <SearchBar />
      <Link to="/form">Add a new dog</Link> <br />
      <button onClick={handleRefresh}>Reset filters</button>
      <div>
        <label htmlFor="source">Get pups from: </label>
        <select
          value={selectDefault}
          onChange={(e) => {
            handleSource(e);
          }}
          name="source"
        >
          <option value="DEFAULT" disabled hidden>
            Choose here
          </option>
          <option value="all">All</option>
          <option value="api">API only</option>
          <option value="submissions">My submissions</option>
        </select>
      </div>
      <div>
        <label htmlFor="order">Order by: </label>
        <select
          value={selectDefault}
          onChange={(e) => {
            handleSort(e);
          }}
          name="order"
        >
          <option value="DEFAULT" disabled hidden>
            Choose here
          </option>
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
          value={selectDefault}
          name="temperament"
          onChange={(e) => {
            handleTemper(e);
          }}
        >
          <option value="DEFAULT" disabled hidden>
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
          <Cards allBreeds={currentPups} loading={isLoading} />
        </>
      )}
      {allBreeds.length ? (
        <Pagination
          pupsPerPage={pupsPerPage}
          totalPups={allBreeds.length}
          paginate={paginate}
          paginatePrev={paginatePrev}
          currentPage={currentPage}
          paginateNext={paginateNext}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
