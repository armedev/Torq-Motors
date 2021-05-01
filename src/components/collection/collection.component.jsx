import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { gsap, Power3 } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';

import './collection.styles.scss';
import { ReactComponent as BackArrow } from '../../assets/left-arrow.svg';
import { ReactComponent as SharePlane } from '../../assets/paper-plane.svg';

import { selectCollection } from '../../redux/shop/shop-selectors';
import firebase from '../../firebase/firebase.utils';
import Like from '../../components/like/like.component';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { transition } from '../../utils/framer-motion.config';

gsap.registerPlugin(CSSRulePlugin);

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

const Collection = ({ Collection, history, currentUser }) => {
  const { id, photoUrls, main } = Collection;
  const [selectedUrl, setSelectedUrl] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const urls = photoUrls;

  useEffect(() => {
    setSelectedUrl(urls[0]);
  }, [urls]);

  //animations
  let imageContainerAfter = CSSRulePlugin.getRule(
    '.collection__img__main::after'
  );
  let imageContainerBefore = CSSRulePlugin.getRule(
    '.collection__img__main::before'
  );

  useEffect(() => {
    if (imageLoaded) {
      gsap.to([imageContainerBefore, imageContainerAfter], {
        duration: 2,
        transform: 'translateX(-111%) skewX(-2deg)',
        ease: Power3.easeOut,
        delay: 0.3,
        stagger: {
          amount: 0.3,
        },
      });
    } else {
      gsap.to([imageContainerBefore, imageContainerAfter], {
        duration: 0,
        transform: 'none',
      });
    }
  }, [imageLoaded, imageContainerBefore, imageContainerAfter]);

  const handleShareClick = () => {
    if (navigator.share)
      navigator.share({
        url: window.location.href,
        title: 'Torq Motors',
        text: 'Hey, checkout this awesome bike I found on Torq Motors',
      });
  };

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="collection"
    >
      <div className="collection__img">
        <div className="collection__img__preview">
          {urls.map((url, index) => (
            <img
              src={url}
              key={index}
              alt="bike"
              className="collection__img__preview__raw"
              onClick={() => setSelectedUrl(url)}
            />
          ))}
        </div>
        <div className="collection__img__main">
          <img
            src={selectedUrl}
            alt="bike"
            className="collection__img__main__raw"
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
        </div>
      </div>
      <div className="collection__details">
        <div className="collection__details__header">
          <h1 className="collection__details__header__h1">
            {main.name.charAt(0).toUpperCase() + main.name.slice(1)}
          </h1>
        </div>
        <motion.div
          exit={{ opacity: 0 }}
          transition={transition}
          className="collection__details__body"
        >
          <h3 className="collection__details__body__brand">
            Manufacturer: {main.rcDetails.manufacturer.toUpperCase()}
          </h3>
          <h3 className="collection__details__body__model">
            MODEL: {main.about.model}
          </h3>
          <h3 className="collection__details__body__price">
            PRICE: {main.about.price} inr
          </h3>
          <h3 className="collection__details__body__owners">
            Owners: {main.rcDetails.ownerSlNo} owners
          </h3>
          <h3 className="collection__details__body__km">
            KM ran: {main.about.kmRan} km
          </h3>
          <h3 className="collection__details__body__fuel">
            Fuel Type: {main.rcDetails.fuel}
          </h3>
          <h3 className="collection__details__body__insurance">
            Insurance:{' '}
            {firebase.firestore.Timestamp.now() > main.rcDetails.insurance
              ? `Expired on `
              : `Valid till `}
            {new Date(main.rcDetails.insurance.seconds * 1000).toDateString()}
          </h3>
          <p className="collection__details__body__desc">
            {main.about.subTitle}
          </p>
        </motion.div>
      </div>
      <div className="collection__footer">
        <div
          className="collection__footer__back"
          onClick={() => history.goBack()}
        >
          <BackArrow className="collection__footer__back-arrow" /> BACK
        </div>
        <div className="collection__footer__right">
          {currentUser ? <Like id={id} /> : null}
          {navigator.share ? (
            <SharePlane
              onClick={handleShareClick}
              style={{ width: '40px', cursor: 'pointer', margin: '0px 50px' }}
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  Collection: selectCollection(ownProps.match.params.bikeId)(state),
  currentUser: selectCurrentUser(state),
});

export default React.memo(withRouter(connect(mapStateToProps)(Collection)));
