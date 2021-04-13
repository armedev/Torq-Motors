import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';

import './small-card.styles.scss';

import { animationfunc } from '../../utils/button-animations/otherfuncs';

const SmallCard = ({ image, headerText, desc, history, routeName }) => {
  let domRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      className={`small-card ${visible ? 'visible' : ''}`}
      ref={(e) => (domRef = e)}
    >
      <div className="small-card__image">
        <img className="small-card__image__raw" src={image} alt="garage pic" />
      </div>
      <div className="small-card__desc">
        <span className="small-card__desc__header">{headerText}</span>
        <span className="small-card__desc__main">{desc}</span>
        <span
          onMouseEnter={(e) => animationfunc(e)}
          className="small-card__desc__button button__styles drive"
          onClick={() => history.push(`${routeName}`)}
        >
          {'proceed'}
        </span>
      </div>
    </div>
  );
};

export default withRouter(SmallCard);
