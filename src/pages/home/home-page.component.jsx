import React from "react";
import { Link } from "react-router-dom";

import "./home-page.styles.scss";
import Background from "../../assets/background.svg";
// import { ReactComponent as Logo } from "../../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="home" style={{ backgroundImage: `url(${Background})` }}>
      <div className="home__container">
        <div className="home__header">
          <div className="home__header__logo__container"></div>
          <div className="home__header__signin__container">
            <Link to="/signin" className="home__header__signin">
              Sign In
            </Link>
          </div>
        </div>
        <div className="home__body">
          <div className="home__body__shop__link__container">
            <Link to="/shop" className="home__body__shop__link">
              View our Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
