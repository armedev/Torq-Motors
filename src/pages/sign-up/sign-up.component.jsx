import React from "react";

import "./sign-up.styles.scss";
import "../../other.styles.scss";
import { animationfunc } from "../../otherfuncs.js";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const {
    email,
    password,
    confirmPassword,
    displayName,
    handleSubmit,
    handleChange,
  } = props;

  return (
    <div className="sign-up">
      <span className="sign-up__title">
        SIGN UP{" "}
        <span role="img" aria-label="heart">
          💝
        </span>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          className="sign-up__dname"
          type="text"
          required
          placeholder="Display Name"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <input
          className="sign-up__email"
          type="email"
          required
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <input
          className="sign-up__password"
          type="password"
          required
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <input
          className="sign-up__password"
          type="password"
          required
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <button
          type="submit"
          className="sign-up__submit drive button__styles"
          onMouseEnter={(e) => animationfunc(e)}
        >
          SignUp
        </button>
      </form>
      <span className="sign-up__signin">
        Already have an account?{" "}
        <Link className="sign-up__signin_link" to="/signin">
          SignIn
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
