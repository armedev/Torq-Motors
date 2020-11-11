import React from "react";

import "./contact-page.styles.scss";
import { ReactComponent as Gmail } from "../../assets/gmail.svg";

import Map from "../../components/map/map.collction";
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

const ContactPage = () => {
  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="contact-page"
    >
      <div className="contact-page__container">
        <span className="contact-page__container__title">
          VISIT OR EMAIL us{" "}
          <span role="img" aria-label="heart">
            💝
          </span>
        </span>
        <div className="contact-page__container__visit">
          <span className="contact-page__container__visit__address">
            BH Road Vidyanagar shimoga, karnataka India
          </span>
          <span className="contact-page__container__visit__hours">
            open on MONDAY-SATURDAY(10AM-10PM)
          </span>
          <Map
            width={window.screen.width < 600 ? 300 : 500}
            height={window.screen.width < 600 ? 300 : 500}
          />
        </div>
        <div className="contact-page__container__links">
          <div>
            <li>
              <Gmail className="gmail" />
              <a
                href="mailto:epiratesdev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                epiratesdev@gmail.com{" "}
              </a>
            </li>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
