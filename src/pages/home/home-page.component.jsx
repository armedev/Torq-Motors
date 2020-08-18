import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import "./home-page.styles.scss";
import "../../other.styles.scss";
import { animationfunc } from "../../otherfuncs.js";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const HomePage = ({ history }) => {
  const style = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0)" },
  });

  return (
    <animated.div style={style}>
      <div className="home">
        <div className="home__container">
          <div className="home__header">
            <div className="home__header__logo__container">
              <Logo
                className="home__header__logo"
                onClick={() => history.push("/")}
              />
            </div>
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
            <div className="home__body__brand__container">
              <Logo className="home__body__brand__logo" />
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default withRouter(HomePage);
