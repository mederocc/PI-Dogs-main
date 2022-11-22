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
    <div className={classes["bg-container"]}>
      <div className={classes["title-container"]}>
        <div></div>
        <Link style={{ textDecoration: "none" }} to="/Home">
          <div className={classes.title}>Henry Dogs</div>
        </Link>
        <div></div>
      </div>

      <SearchBar />
      <div className={classes.container}>
        <div></div>
        <div className={classes["upper-box"]}>
          <Link style={{ textDecoration: "none" }} to="/form">
            <button>
              <span>Add a new dog</span>
            </button>
          </Link>
          <button onClick={handleRefresh}>
            <span>Reset filters</span>
          </button>
          <div className={classes["filter-list"]}>
            <div className={classes.source}>
              <label htmlFor="source" hidden>
                Source
              </label>
              <select
                value={selectDefault}
                onChange={(e) => {
                  handleSource(e);
                }}
                name="source"
              >
                <option value="DEFAULT" disabled hidden>
                  Source
                </option>
                <option value="all">All</option>
                <option value="api">API only</option>
                <option value="submissions">My submissions</option>
              </select>
            </div>
            <div className={classes.sort}>
              <label htmlFor="order" hidden>
                Sort
              </label>
              <select
                value={selectDefault}
                onChange={(e) => {
                  handleSort(e);
                }}
                name="order"
              >
                <option value="DEFAULT" disabled hidden>
                  Sort
                </option>
                <option value="AtoZ">A to Z</option>
                <option value="ZtoA">Z to A</option>
                <option value="lightest">Lightest</option>
                <option value="heaviest">Heaviest</option>
              </select>
            </div>
            <div className={classes.temperament}>
              <label htmlFor="temperament" hidden>
                Temperament
              </label>

              <select
                value={selectDefault}
                name="temperament"
                onChange={(e) => {
                  handleTemper(e);
                }}
              >
                <option value="DEFAULT" disabled hidden>
                  Temperament
                </option>
                {temperaments.map((t) => (
                  <option key={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {!allBreeds.length && !temperaments.length ? (
        <img className={classes.loading} alt="loading" src={loadingDog} />
      ) : (
        <>
          <Cards allBreeds={currentPups} loading={isLoading} />
        </>
      )}
      {allBreeds.length > pupsPerPage ? (
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
    </div>
  );
};

export default Home;
