import React from "react";

import "./sign-in.styles.scss";
import "../../utils/other.styles.scss";
import { ReactComponent as Google } from "../../assets/google.svg";

import { animationfunc } from "../../utils/otherfuncs.js";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const {
    email,
    password,
    handleSubmit,
    handleChange,
    signInWithGoogle,
  } = props;

  return (
    <div className="sign-in">
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
    </div>
  );
};

export default SignIn;
