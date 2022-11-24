import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "../utils/picture_bank/muddy.jpeg";
import { useState, useEffect } from "react";

const Cards = ({ allBreeds, loading }) => {
  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAltMessage(
        <div className={classes["alt-message"]}>
          <p>No match was found. Try adding one!</p>
          <img alt="missing dog" src={missingDog}></img>
        </div>
      );
    }, 1000);
  }, [allBreeds]);

  return (
    <div className={classes["lower-box"]}>
      <div>
        {!loading && allBreeds.length ? (
          <div className={classes.cards}>
            {allBreeds.map((b) => (
              <Card key={b.id} dog={b} />
            ))}
          </div>
        ) : (
          ""
        )}
        {!loading && !allBreeds.length ? altMessage : ""}
      </div>
    </div>
  );
};

export default Cards;
