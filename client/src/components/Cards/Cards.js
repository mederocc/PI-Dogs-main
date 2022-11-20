import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "../utils/missing-dog.jpeg";
import { useState, useEffect } from "react";

const Cards = ({ allBreeds, loading }) => {
  const [altMessage, setAltMessage] = useState("");

  useEffect(() => {
    setAltMessage(
      <>
        <img alt="missing dog" src={missingDog}></img>
        <p>No match was found. Try adding one!</p>
      </>
    );
  }, [allBreeds]);

  return (
    <>
      {!loading && allBreeds.length ? (
        <div className={classes.cards}>
          {allBreeds.map((b) => (
            <Card key={b.id} dog={b} />
          ))}
        </div>
      ) : (
        altMessage
      )}
    </>
  );
};

export default Cards;
