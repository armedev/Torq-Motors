import React from "react";

import "./sign-in.styles.scss";
import "../../utils/button-animations/other.styles.scss";
import { ReactComponent as Google } from "../../assets/google.svg";

import { animationfunc } from "../../utils/button-animations/otherfuncs.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const staggerAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
      direction: 1,
      when: "afterChildren",
    },
  },
  out: {
    opacity: 0,
  },
};

const SignIn = (props) => {
  const {
    email,
    password,
    handleSubmit,
    handleChange,
    signInWithGoogle,
  } = props;

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="sign-in"
    >
      <span className="sign-in__title">
        SIGN IN{" "}
        <span role="img" aria-label="heart">
          💝
        </span>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          className="sign-in__email"
          type="email"
          required
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <input
          className="sign-in__password"
          type="password"
          required
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button
          type="submit"
          className="sign-in__submit drive button__styles"
          onMouseEnter={(e) => animationfunc(e)}
        >
          SignIn
        </button>
      </form>
      <div className="sign-in__google__container">
        <span>Or Sign In with</span>
        <Google
          className="sign-in__google__logo"
          onClick={() => signInWithGoogle()}
        />
      </div>

      <span className="sign-in__signup">
        Don't have an account?{" "}
        <Link className="sign-in__signup_link" to="/signup">
          SignUp
        </Link>
      </span>
    </motion.div>
  );
};

export default SignIn;
