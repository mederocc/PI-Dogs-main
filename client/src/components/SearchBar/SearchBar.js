import React from "react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreedsFromAPI } from "../../actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const filters = useSelector((state) => state.filters);
  const [inputError, setInputError] = useState(null);
  let queryError = useSelector((state) => state.queryError);
  const [isFocused, setIsfocused] = useState("");

  const handleChange = () => {
    setInputError(/\d/.test(searchRef.current.value));
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name"></label>
      <input
        onFocus={handleFocus}
        onChange={handleChange}
        ref={searchRef}
        name="name"
        type="text"
      ></input>
      <button type="submit" disabled={inputError}>
        Search
      </button>
      <br />
      {inputError && <p>Field must not contain numbers</p>}
      {queryError.error && isFocused === false && <p>{queryError.message}</p>}
    </form>
  );
};

export default SearchBar;
