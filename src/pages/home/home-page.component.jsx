import React, { useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { gsap, Power2 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import "./home-page.styles.scss";
import "../../utils/button-animations/other.styles.scss";

import { animationfunc } from "../../utils/button-animations/otherfuncs.js";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { auth } from "../../firebase/firebase.utils";
import { motion } from "framer-motion";

gsap.registerPlugin(CSSRulePlugin);

const staggerAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const HomePage = ({ history, currentUser }) => {
  let home = useRef(null);
  let logo = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let button1 = useRef(null);
  let button2 = useRef(null);
  let homeAfter = CSSRulePlugin.getRule(".home::after");

  useEffect(() => {
    gsap.to(home, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    });
    gsap.to(homeAfter, {
      duration: 2,
      transform: "translateX(-150%) skewX(-5deg)",
      ease: Power2.easeOut,
    });
    gsap.to(homeAfter, {
      duration: 1,
      width: "0",
      opacity: 0,
      delay: 2,
      ease: Power2.easeIn,
    });
    gsap.from(logo, {
      duration: 0.5,
      transform: "scale(1.3)",
      ease: "Power1.ease",
    });
    gsap.from([line1, line2], {
      duration: 0.5,
      x: -50,
      opacity: 0,
      delay: 0.7,
      ease: Power2.easeIn,
      stagger: {
        amount: 0.2,
      },
    });
    gsap.from([button2, button1], {
      duration: 0.5,
      transform: "translateY(10px)",
      opacity: 0,
      delay: 1,
      ease: Power2.easeIn,
      stagger: {
        amount: 0.2,
      },
    });
  }, [homeAfter]);

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="home"
    >
      <div ref={(el) => (home = el)} className="home__container">
        <div className="home__header">
          <div className="home__header__logo__container">
            <Logo
              className="home__header__logo"
              onClick={() => history.push("/")}
            />
          </div>
          <div className="home__header__signin__container">
            {currentUser ? (
              <span
                onClick={() => auth.signOut()}
                className="home__header__signin sign-out"
                title={`signed In as: ${currentUser.email}`}
              >
                Sign Out
              </span>
            ) : (
              <Link to="/signin" className="home__header__signin">
                Sign In
              </Link>
            )}
          </div>
        </div>
        <div className="home__body">
          <div className="home__body__container">
            <span ref={(el) => (line1 = el)} className="home__body__title">
              Torq<span> Motors</span>
            </span>
            <span
              ref={(el) => (line2 = el)}
              className="home__body__description"
            >
              The Stop for all of<span> Your BIKE</span>
            </span>
            <div className="home__body__link__container">
              <Link
                ref={(el) => (button1 = el)}
                to="/about"
                className="home__body__about__link button__styles drive"
                onMouseEnter={(e) => animationfunc(e)}
              >
                AboutUs
              </Link>
              <Link
                ref={(el) => (button2 = el)}
                to="/shop"
                className="home__body__shop__link button__styles drive"
                onMouseEnter={(e) => animationfunc(e)}
              >
                Vehicles
              </Link>
            </div>
          </div>
          <div
            ref={(el) => (logo = el)}
            className="home__body__brand__container"
          >
            <Logo className="home__body__brand__logo" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(HomePage));
