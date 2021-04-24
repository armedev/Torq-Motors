import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { gsap, Power1, Power0 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './left-card.styles.scss';

import { animationfunc } from '../../utils/button-animations/otherfuncs';

gsap.registerPlugin(ScrollTrigger);

const LeftCard = ({ headerText, routeName, image, desc, history }) => {
  let cardref = useRef(null);
  let headerref = useRef(null);
  let headerTextref = useRef(null);

  useEffect(() => {
    gsap.to(cardref, {
      duration: 0.2,
      opacity: 1,
      ease: Power1.easeIn,
    });
    gsap.to(headerref, {
      duration: 0.3,
      opacity: 1,
      right: 0,
      ease: Power0.easeIn,
      delay: 0,
      scrollTrigger: {
        trigger: cardref,
      },
      onComplete: () =>
        gsap.to(headerTextref, {
          duration: 0.3,
          transform: 'translateY(0%)',
          ease: Power0.easeIn,
          delay: 0.1,
        }),
    });
  });

  return (
    <div ref={(e) => (cardref = e)} className="left-card">
      <div ref={(e) => (headerref = e)} className="left-card__header">
        <span
          onClick={() => history.push(`${routeName}`)}
          className="left-card__header__text"
          ref={(e) => (headerTextref = e)}
        >
          {headerText}
        </span>
      </div>
      <div className="left-card__img">
        <img className="left-card__img__raw" src={image} alt="nothing" />
      </div>
      <div className="left-card__desc">
        <span className="left-card__desc__main">{desc}</span>
        <span
          onClick={() => history.push(`${routeName}`)}
          className="left-card__desc__link button__styles drive"
          onMouseEnter={(e) => animationfunc(e)}
        >
          {'Proceed'}
        </span>
      </div>
    </div>
  );
};

export default withRouter(LeftCard);
