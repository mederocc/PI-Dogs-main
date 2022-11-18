import React from "react";
import { useState, useEffect } from "react";
import classes from "./Form.module.css";
import { fetchTemperamentsFromAPI } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [inputError, setInputError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(fetchTemperamentsFromAPI());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  const handleChange = (e) => {
    if (e.target.name === "name" && e.target.value.length) {
      if (
        /\d/.test(e.target.value) === true ||
        !/^[A-Za-z0-9 ]+$/.test(e.target.value) === true
      ) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    } else {
      setInputError(false);
    }

    if (e.target.name === "temperaments") {
      if (form.temperaments.includes(e.target.value)) return;
      setForm((prevState) => ({
        ...prevState,
        temperaments: [...prevState.temperaments, e.target.value],
      }));
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.maxHeight || !form.weight || !form.temperaments) {
      return;
    }
    if (inputError) {
      //name, height, weight, life_span, image, temperament

      return;
    }
    const postData = {
      name:
        form.name.charAt(0).toUpperCase() + form.name.slice(1).toLowerCase(),
      height: `${form.minHeight} - ${form.maxHeight}`,
      weight: form.weight,
      life_span: `${form.life_span} years`,
      image: form.image,
      temperament: form.temperaments,
    };

    const response = await fetch("http://localhost:3001/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    console.log(response.json());

    setForm({
      name: "",
      minHeight: "",
      maxHeight: "",
      weight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
  };

  const handleTemperament = (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes["fields-container"]}>
        <label htmlFor="name">Name* </label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          value={form.name}
        ></input>
        {inputError && <p>Field must contain letters only</p>}
        <br />

        <label htmlFor="minHeight">Minimum Height: </label>
        <input
          onChange={handleChange}
          value={form.minHeight}
          name="minHeight"
          type="number"
        ></input>
        <br />

        <label htmlFor="maxHeight">Maximum Height* </label>
        <input
          onChange={handleChange}
          value={form.maxHeight}
          name="maxHeight"
          type="number"
        ></input>
        <br />

        <label htmlFor="weight">Weight* </label>
        <input
          onChange={handleChange}
          value={form.weight}
          name="weight"
          type="number"
        ></input>
        <br />

        <label htmlFor="life_span">Lifespan </label>
        <input
          onChange={handleChange}
          value={form.life_span}
          name="life_span"
          type="number"
        ></input>
        <br />

        <label htmlFor="image">Image URL </label>
        <input
          onChange={handleChange}
          value={form.image}
          name="image"
          type="text"
        ></input>
        <br />

        <label htmlFor="temperaments">Temperament*</label>
        <select name="temperaments" onChange={handleChange}>
          <option defaultValue="" selected disabled>
            Choose here
          </option>
          {temperaments.map((t) => (
            <option key={t.id}>{t.name}</option>
          ))}
        </select>
        <br />
        {form.temperaments.length
          ? form.temperaments.map((t) => (
              <p key={t} onClick={handleTemperament}>
                {t}
              </p>
            ))
          : ""}
        <br />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
