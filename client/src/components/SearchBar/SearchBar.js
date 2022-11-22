import React from "react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreedsFromAPI } from "../../actions";
import classes from "./SearchBar.module.css";
const SearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const filters = useSelector((state) => state.filters);
  const [inputError, setInputError] = useState(null);
  let queryError = useSelector((state) => state.queryError);
  const [isFocused, setIsfocused] = useState("");

  const handleChange = () => {
    setIsfocused(true);
    if (searchRef.current.value.length) {
      setInputError(!/^[a-z ,.'-]+$/i.test(searchRef.current.value));
      return;
    }
    setInputError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputError || searchRef.current.value.trim().length === 0) return;

    console.log("input was valid");
    setIsfocused(false);

    dispatch(fetchBreedsFromAPI(filters, searchRef.current.value));
    searchRef.current.value = "";
  };

  const handleFocus = () => {
    setIsfocused(true);
  };

  return (
    <div className={classes["bar-container"]}>
      <div className={classes["empty-l"]}></div>
      <div className={classes["search-form"]}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <input
            autoComplete="off"
            className={classes.input}
            onFocus={handleFocus}
            onChange={handleChange}
            ref={searchRef}
            name="name"
            type="text"
          ></input>
          <button
            className={classes["input-btn"]}
            type="submit"
            disabled={inputError}
          >
            Search
          </button>
        </form>
      </div>
      <div className={classes.errors}>
        {inputError && <p>Input is invalid</p>}
        {queryError.error && isFocused === false && <p>{queryError.message}</p>}
      </div>
    </div>
  );
};

export default SearchBar;
