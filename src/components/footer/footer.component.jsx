import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss';
import { ReactComponent as ContactRocket } from '../../assets/message-rocket.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__contact">
        <Link to="/contact">
          Contact Us <ContactRocket className="footer__contact__img" />
        </Link>
      </div>
      <span className="footer__copyright">
        © All Rights Reserved By Torq Motor's {new Date().getFullYear()}
      </span>
    </div>
  );
};

export default Footer;
