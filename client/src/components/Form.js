import React from "react";

const Form = () => {
  // name, height, weight, lifeSpan, temperament

  return (
    <form>
      <label>Name: </label>
      <input name="name" type="text" value=""></input>

      <button type="submit">Create Movie</button>
    </form>
  );
};

export default Form;
