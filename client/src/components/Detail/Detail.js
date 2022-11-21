import React from "react";
import { useState, useEffect } from "react";
import loadingImg from "../utils/piq-loading.gif";
import { Link } from "react-router-dom";

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

  return isLoading ? (
    <div>
      <Link style={{ textDecoration: "none" }} to="/Home">
        <h1>Henry Dogs</h1>
      </Link>
      <img alt="loading" src={loadingImg} />
    </div>
  ) : (
    detail.id && (
      <div>
        <Link to="/Home">
          <h1>Henry Dogs</h1>
        </Link>
        <img
          alt={detail.name}
          src={detail.image.url ? detail.image.url : detail.image}
        />
        <p>{detail.name}</p>
        <p>{detail.height}</p>
        <p>{detail.weight}</p>
        <p>{detail.lifeSpan}</p>
        <p>{detail.temperament}</p>
      </div>
    )
  );
};

export default Detail;
