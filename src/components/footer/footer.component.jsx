import React from "react";
import { Link } from "react-router-dom";

import "./footer.styles.scss";
import { ReactComponent as ContactRocket } from "../../assets/message-rocket.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__contact">
        <Link to="/contact">
          Contact Us <ContactRocket height="30" width="30" />
        </Link>
      </div>
      <span className="footer__copyright">
        © All Rights Reserved By Hero Motor's {new Date().getFullYear()}
      </span>
    </div>
  );
};

export default Footer;
