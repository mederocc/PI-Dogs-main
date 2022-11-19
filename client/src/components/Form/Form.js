import React from "react";
import { useState, useEffect } from "react";
import classes from "./Form.module.css";
import { fetchTemperamentsFromAPI } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [selectDefault, setSelectDefault] = useState("DEFAULT");
  const [didSubmit, setDidSubmit] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const [formValidity, setFormValidity] = useState({
    name: false,
    minHeight: false,
    maxHeight: false,
    weight: false,
    life_span: false,
    image: false,
    temperaments: false,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    dispatch(fetchTemperamentsFromAPI());
  }, [dispatch]);

  useEffect(() => {
    setFormIsValid(!Object.values(formValidity).includes(false));
  }, [formValidity]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        if (e.target.value.length) {
          // /\d/.test(e.target.value) checks true if target contains numbers
          // !/^[A-Za-z0-9 ]+$/.test(e.target.value) checks true if target contains special characters

          if (
            /\d/.test(e.target.value) ||
            !/^[A-Za-z0-9 ]+$/.test(e.target.value)
          ) {
            setFormValidity((prevState) => ({ ...prevState, name: false }));
          } else {
            setFormValidity((prevState) => ({ ...prevState, name: true }));
          }
          setForm({ ...form, [e.target.name]: e.target.value });
          return;
        }

        setFormValidity((prevState) => ({ ...prevState, name: false }));
        setForm({ ...form, [e.target.name]: e.target.value });

        return;

      case "temperaments":
        setFormValidity((prevState) => ({ ...prevState, temperaments: true }));

        if (form.temperaments.includes(e.target.value)) {
          setSelectDefault("DEFAULT");
          return;
        }
        setForm((prevState) => ({
          ...prevState,
          temperaments: [...prevState.temperaments, e.target.value],
        }));
        setSelectDefault("DEFAULT");
        return;

      default:
        console.log(formValidity[e.target.name]);
        if (e.target.value.length) {
          setForm({ ...form, [e.target.name]: e.target.value });
          setFormValidity((prevState) => ({
            ...prevState,
            [e.target.name]: true,
          }));
          return;
        }
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormValidity((prevState) => ({
          ...prevState,
          [e.target.name]: false,
        }));

        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name:
        form.name.charAt(0).toUpperCase() + form.name.slice(1).toLowerCase(),
      height: `${form.minHeight ? form.minHeight : "unknown"} - ${
        form.maxHeight
      }`,
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

    setResponseMessage(await response.json());

    setForm({
      name: "",
      minHeight: "",
      maxHeight: "",
      weight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });

    setDidSubmit(true);
  };

  const handleRemove = (e) => {
    console.log(e.target.innerHTML);
    const removedTemp = e.target.innerHTML;

    setForm((prevState) => ({
      ...prevState,
      temperaments: prevState.temperaments.filter((t) => t !== removedTemp),
    }));
  };

  return (
    <>
      {!didSubmit && (
        <form onSubmit={handleSubmit}>
          <div className={classes["fields-container"]}>
            <label htmlFor="name">Name* </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={form.name}
            ></input>
            {/* {inputError && <p>Field must contain letters only</p>} */}
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
            <select
              value={selectDefault}
              name="temperaments"
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled hidden>
                Choose here
              </option>
              {temperaments.map((t) => (
                <option key={t.id}>{t.name}</option>
              ))}
            </select>
            <br />
            {form.temperaments.length
              ? form.temperaments.map((t) => (
                  <p key={t} onClick={handleRemove}>
                    {t}
                  </p>
                ))
              : ""}
            <br />
            <button type="submit" disabled={!formIsValid}>
              Submit
            </button>
          </div>
        </form>
      )}
      {didSubmit && <h1>{responseMessage}</h1>}
    </>
  );
};

export default Form;
