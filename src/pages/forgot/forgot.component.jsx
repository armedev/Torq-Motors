import React, { useState } from 'react';

import './forgot.styles.scss';
import { ReactComponent as Padlock } from '../../assets/forgot-password-assets/padlock.svg';

import { animationfunc } from '../../utils/button-animations/otherfuncs';
import Firebase from '../../firebase/firebase.utils';
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

const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Firebase.auth()
      .sendPasswordResetEmail(email)
      .then((res) => window.flash('Password reset link sent to email'))
      .catch((err) => {
        window.flash('User Email Not found', 'error');
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="forgot"
    >
      <div className="forgot__header">
        Forgot Password <Padlock style={{ width: '30px', height: '30px' }} />
      </div>
      <div className="forgot__container">
        <form onSubmit={handleSubmit} className="forgot__container__form">
          <div className="forgot__container__form__container">
            Enter your email:{' '}
            <input
              className="forgot__container__form__container__input"
              required
              type="email"
              onChange={(e) => handleChange(e)}
              value={email}
              name="email"
            />
          </div>
          <button
            type="submit"
            className="forgot__container__form__button drive button__styles"
            onMouseEnter={animationfunc}
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Forgot;
