import React from "react";
import { Link } from "react-router-dom";

import "./home-page.styles.scss";
import "./other.styles.scss";
import { animationfunc } from "./home-page.container";
// import { ReactComponent as Logo } from "../../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <div className="home__header__logo__container"></div>
          <div className="home__header__signin__container rubber__band__home">
            <Link to="/signin" className="home__header__signin">
              Sign In
            </Link>
          </div>
        </div>
        <div className="home__body">
          <div className="home__body__container">
            <span className="home__body__title">
              Hero<span> Motors</span>
            </span>
            <span className="home__body__description">
              The Stop for all of<span> Your BIKE</span>
            </span>
            <div className="home__body__link__container">
              <Link
                to="/about"
                className="home__body__about__link button__styles drive"
                onMouseEnter={(e) => animationfunc(e)}
              >
                AboutUs
              </Link>
              <Link
                to="/shop"
                className="home__body__shop__link button__styles drive"
                onMouseEnter={(e) => animationfunc(e)}
              >
                Vehicles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
