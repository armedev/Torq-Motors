import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import './emailVerify.styles.scss';
import { ReactComponent as MailBox } from '../../assets/email-verify-assets/mailbox.svg';

import useWindowResolution from '../../utils/custom-hooks/usewindowresolution';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import Firebase from '../../firebase/firebase.utils';

const EmailVerify = ({ currentUser, history }) => {
  const width = useWindowResolution();
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
    }, [5000]);
    return () => clearTimeout(handler);
  }, []);

  return (
    <div className="verify">
      <div className="verify__image">
        <span className="verify__image__header">Email Not Verified</span>
        <MailBox
          style={{
            width: width < 1200 ? '100px' : '300px',
            height: width < 1200 ? '100px' : '300px',
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(EmailVerify));
