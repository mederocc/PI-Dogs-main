import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to="/home">
        <button>Enter Site</button>
      </Link>
    </>
  );
};

export default LandingPage;
