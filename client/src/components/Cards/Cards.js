import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "../utils/missing-dog.jpeg";
import { useState, useEffect } from "react";

const Cards = ({ allBreeds }) => {
  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    setAltMessage(
      <>
        <img alt="missing dog" src={missingDog}></img>
        <p>No match was found. Try adding one!</p>
      </>
    );
  }, [allBreeds]);

  if (!allBreeds.length) return altMessage;

  return (
    <div className={classes.cards}>
      {allBreeds.length
        ? allBreeds.map((b) => <Card key={b.id} dog={b} />)
        : ""}
    </div>
  );
};

export default Cards;
