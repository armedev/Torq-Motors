import React from 'react';
import { Link } from 'react-router-dom';

import './sign-up.styles.scss';
import '../../utils/button-animations/other.styles.scss';

import { animationfunc } from '../../utils/button-animations/otherfuncs.js';
import { motion } from 'framer-motion';

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
      when: 'afterChildren',
    },
  },
  out: {
    opacity: 0,
  },
};

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
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="sign-up"
    >
      <span className="sign-up__title">
        SIGN UP{' '}
        <span role="img" aria-label="heart">
          💝
        </span>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          className="sign-up__dname"
          type="text"
          required
          placeholder="Name"
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
        Already have an account?{' '}
        <Link className="sign-up__signin_link" to="/signin">
          SignIn
        </Link>
      </span>
    </motion.div>
  );
};

export default SignUp;
