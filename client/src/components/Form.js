import React from "react";
import { useState, useEffect, useRef } from "react";

const Form = () => {
  const name = useRef("");
  const height = useRef("");
  const weight = useRef("");
  const lifeSpan = useRef("");
  const temperament = useRef("");

  // const name = nameRef.current.value;
  // const height = heightRef.current.value;
  // const weight = weightRef.current.value;
  // const lifeSpan = lifeSpanRef.current.value;
  // const temperament = temperamentRef.current.value;
  const [forIsValid, setFormIsValid] = useState(false);
  const [form, setForm] = useState({ name: "" });
  // name, height, weight, lifeSpan, temperament

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name: name.current.value });
    setForm({ name: name.current.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        // onChange={(e) => {
        //   handleChange(e);
        // }}
        name="name"
        type="text"
        // value={name}
        ref={name}
      ></input>

      {/* <label htmlFor="height">Height: </label>
      <input name="height" type="text" value={height} ref={height}></input>

      <label htmlFor="weight">Weight: </label>
      <input name="weight" type="text" value={weight} ref={weight}></input>

      <label htmlFor="lifeSpan">LifeSpan: </label>
      <input
        name="lifeSpan"
        type="text"
        value={lifeSpan}
        ref={lifeSpan}
      ></input>

      <label htmlFor="temperament">temperament: </label>
      <input
        name="temperament"
        type="text"
        value={temperament}
        ref={temperament}
      ></input> */}

      <button type="submit">Submit</button>

      <p>{form.name}</p>
    </form>
  );
};

export default Form;
