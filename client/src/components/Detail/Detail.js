import React from "react";
import { useState, useEffect } from "react";
import loadingImg from "../utils/piq-loading.gif";
import { Link } from "react-router-dom";
import classes from "./Detail.module.css";

const Detail = (props) => {
  const [detail, setDetail] = useState({ id: null }); //
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/dogs/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setIsLoading(false);
      });

    return () => {
      setIsLoading(true);
    };
  }, [props.match.params.id]);

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
      ) : (
        detail.id && (
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
          </>
        )
      )}
    </div>
  );
};

export default Detail;
