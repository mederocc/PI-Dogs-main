import React from "react";
import { useState, useEffect } from "react";
const Detail = (props) => {
  const [detail, setDetail] = useState({ id: null }); //

  useEffect(() => {
    fetch(`http://localhost:3001/dogs/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, [props.match.params.id]);

  return (
    detail.id && (
      <div>
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
