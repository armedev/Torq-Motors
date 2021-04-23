import React, { useState, useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collection-item.styles.scss';

import { selectCurrentUser } from '../../redux/user/user-selectors';
import { storage } from '../../firebase/firebase.utils';
import Spinner from '../spinner/spinner.component';
import Like from '../like/like.component';
import { motion } from 'framer-motion';

const anime1 = {
  show: {
    transition: {
      duration: 0.1,
      delay: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.8,
      when: 'afterChildren',
    },
  },
};

const anime2 = {
  initial: {
    opacity: 0,
    x: 10,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
      ease: 'easeIn',
      staggerChildren: 0.5,
      delay: 0.2,
    },
  },
};

const CollectionItem = memo(({ collection, currentUser, history }) => {
  const { id, name, model, price } = collection;
  const [url, setUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const imageData = async () => {
      if (isSubscribed) {
        const imageRef = storage.ref(`images/${id}/`);
        await imageRef
          .list()
          .then(
            async (res) =>
              await res.items[0].getDownloadURL().then(async (url) => {
                if (isSubscribed) {
                  setUrl(url);
                  setIsLoaded(false);
                }
              })
          )
          .catch((err) => console.log(err));
      }
    };
    imageData();
    return () => (isSubscribed = false);
  }, [id]);

  return (
    <div className="collection-item" onClick={() => history.push(`buy/${id}`)}>
      <div className="collection-item__image">
        {isLoaded ? (
          <div className="collection-item__image__raw">
            <Spinner />
          </div>
        ) : (
          <img src={url} alt="bike" className="collection-item__image__raw" />
        )}
      </div>
      <motion.div
        variants={anime1}
        animate="show"
        className="collection-item__body"
      >
        <motion.span
          variants={anime2}
          initial="initial"
          animate="animate"
          className="collection-item__body__name"
        >
          {name.slice(0, 20)}
        </motion.span>
        <motion.span
          variants={anime2}
          initial="initial"
          animate="animate"
          className="collection-item__body__model"
        >
          {model}
        </motion.span>
        <div className="collection-item__body__icon-container">
          <motion.span
            variants={anime2}
            initial="initial"
            animate="animate"
            className="collection-item__body__icon-container__verified"
            title="TORQ MOTOR'S VERIFIED"
          >
            {price} ₹
          </motion.span>
          {currentUser ? <Like id={id} /> : null}
        </div>
      </motion.div>
    </div>
  );
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(memo(CollectionItem)));
