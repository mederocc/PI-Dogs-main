import React from "react";
import classes from "./Cards.module.css";
import Card from "../Card/Card";
import missingDog from "./missing-dog.jpeg";

const Cards = ({ allBreeds }) => {
  console.log(allBreeds.length);

  if (!allBreeds.length)
    return (
      <>
        <img alt="missing dog" src={missingDog}></img>
        <p>No match was found. Try adding one!</p>
      </>
    );

  return (
    <div className={classes.cards}>
      {allBreeds.map((b) => (
        <Card key={b.id} dog={b} />
      ))}
    </div>
  );
};

export default Cards;
