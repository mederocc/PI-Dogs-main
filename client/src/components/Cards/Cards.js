import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "./missing-dog.jpeg";
import { useState, useEffect } from "react";

const Cards = ({ allBreeds }) => {
  console.log(allBreeds.length);

  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAltMessage(
        <>
          <img alt="missing dog" src={missingDog}></img>
          <p>No match was found. Try adding one!</p>
        </>
      );
    }, 200);
  }, [allBreeds]);

  if (!allBreeds.length) return altMessage;

  return (
    <div className={classes.cards}>
      {allBreeds.map((b) => (
        <Card key={b.id} dog={b} />
      ))}
    </div>
  );
};

export default Cards;
