import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import './emailVerify.styles.scss';
import { ReactComponent as MailBox } from '../../assets/email-verify-assets/mailbox.svg';

import useWindowResolution from '../../utils/custom-hooks/usewindowresolution';
import { selectCurrentUser } from '../../redux/user/user-selectors';
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

const EmailVerify = ({ currentUser, history }) => {
  const { width } = useWindowResolution();
  const [allow, setAllow] = useState(false);

  const handleResend = async () => {
    const user = Firebase.auth().currentUser;
    if (allow) {
      await user
        .sendEmailVerification()
        .then(() => {
          alert('email verification sent');
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!currentUser || currentUser?.emailVerified) history.push('/');
  }, [history, currentUser]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setAllow(true);
    }, [3000]);
    return () => clearTimeout(handler);
  }, []);

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="verify"
    >
      <div className="verify__image">
        <span className="verify__image__header">Email Not Verified</span>
        <MailBox
          style={{
            width: width < 700 ? '150px' : '300px',
            height: width < 700 ? '150px' : '300px',
          }}
        />
      </div>
      <div className="verify__content">
        <div className="verify__content__container">
          <div>
            An Email with link to verify email address has been sent to the{' '}
            {currentUser?.email}.
          </div>
          <div>
            If you could not find our email kindly also check in the spam inbox.
          </div>
        </div>
        {currentUser && (
          <span
            onClick={handleResend}
            className={
              allow
                ? 'verify__content__resend'
                : 'verify__content__resend block'
            }
          >
            Resend verification email
          </span>
        )}
      </div>
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(EmailVerify));
