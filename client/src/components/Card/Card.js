import React from "react";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={classes["card-container"]}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/detail/${props.dog.id}`}
        dog={props}
      >
        <div className={classes["img-container"]}>
          <img
            src={props.dog.image.url ? props.dog.image.url : props.dog.image}
            alt={props.dog.name}
          />
        </div>
        <h3>{props.dog.name}</h3>
        <p>{props.dog.temperament}</p>
        <p>{props.dog.weight} kg</p>
      </Link>
    </div>
  );
};

export default Card;
