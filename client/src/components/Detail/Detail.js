import React from "react";
import { useState, useEffect } from "react";
import loadingImg from "../utils/piq-loading.gif";
import { Link } from "react-router-dom";
import classes from "./Detail.module.css";

const Detail = (props) => {
  const [detail, setDetail] = useState({ id: null }); //
  const [isLoading, setIsLoading] = useState(true);

  const url = `http://localhost:3001/dogs/${props.match.params.id}`;
  const [wasDeleted, setWasDeleted] = useState({
    deleted: false,
    message: "Deleted",
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setIsLoading(false);
      });

    return () => {
      setIsLoading(true);
    };
  }, [props.match.params.id]);

  const handleDelete = () => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setWasDeleted((prevState) => ({ ...prevState, deleted: true }));
      });
  };

  return (
    <div className={classes.bg}>
      {isLoading ? (
        <div>
          <div className={classes["title-container"]}>
            <div></div>
            <Link style={{ textDecoration: "none" }} to="/Home">
              <div className={classes.title}>Henry Dogs</div>
            </Link>
            <div></div>
          </div>
          <div className={classes["loading-img"]}>
            <img alt="loading" src={loadingImg} />
          </div>
        </div>
      ) : detail.id && !wasDeleted.deleted ? (
        <>
          <div className={classes["title-container"]}>
            <div></div>
            <Link style={{ textDecoration: "none" }} to="/Home">
              <div className={classes.title}>Henry Dogs</div>
            </Link>
            <div></div>
          </div>
          <div className={classes["detail-container"]}>
            <img
              alt={detail.name}
              src={detail.image.url ? detail.image.url : detail.image}
            />
            <div className={classes.info}>
              <h1>{detail.name}</h1>
              <p>{detail.height} cm</p>
              <p>{detail.weight} kg</p>
              <p>{detail.lifeSpan}</p>
              <p>{detail.temperament}</p>
            </div>
          </div>
          {detail.createdInDb && (
            <div className={classes["btn-container"]}>
              <button onClick={handleDelete}>Delete breed</button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={classes["title-container"]}>
            <div></div>
            <Link style={{ textDecoration: "none" }} to="/Home">
              <div className={classes.title}>Henry Dogs</div>
            </Link>
            <div></div>
          </div>
          <div className={classes["delete-msg"]}>
            <p>Breed was successfully deleted</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
