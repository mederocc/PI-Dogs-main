import React from "react";
import { Link } from "react-router-dom";
import classes from "./LandingPage.module.css";
import githubIcon from "../utils/icons/github.png";
import linkedInIcon from "../utils/icons/linkedin.png";

const LandingPage = () => {
  return (
    <div className={classes["landing-container"]}>
      <div className={classes["title-container"]}>
        <div></div>
        <Link style={{ textDecoration: "none" }} to="/home">
          <div className={classes["css-text-mask"]}>HENRY DOGS</div>{" "}
        </Link>
        <div></div>
      </div>

      <div className={classes["btn-container"]}>
        <Link style={{ textDecoration: "none" }} to="/home">
          <button className={classes["enter-btn"]}>ENTER SITE</button>{" "}
        </Link>
      </div>
      <div className={classes["icon-container"]}>
        <div></div>
        <div className={classes["right-sided"]}>
          <div className={classes["icon-one"]}>
            <a href="https://github.com/mederocc/PI-Dogs-main">
              <img
                className={classes["icon-image"]}
                src={githubIcon}
                alt="link to Github"
              />
            </a>
          </div>
          <div className={classes["icon-two"]}>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/carlos-medero-546239107/"
            >
              <img
                rel="noreferrer"
                className={classes["icon-image"]}
                src={linkedInIcon}
                alt="link to LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
