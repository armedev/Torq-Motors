import React from "react";

import "./contact-page.styles.scss";

import { ReactComponent as Phone } from "../../assets/phone.svg";
import { ReactComponent as Gmail } from "../../assets/gmail.svg";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__container__links">
          <span className="contact-page__container__links__title">
            CALL OR EMAIL us{" "}
            <span role="img" aria-label="heart">
              💝
            </span>
          </span>
          <div>
            <li>
              <Phone className="phone" />
              +91 9448159341
            </li>
          </div>
          <div>
            <li>
              <Gmail className="gmail" />
              <a
                href="mailto:epiratesdev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                epiratesdev@gmail.com{" "}
                <span role="img" aria-label="email">
                  &#x1f4e8; &#x2197; &#xfe0f;
                </span>
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
