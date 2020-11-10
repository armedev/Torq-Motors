import React, { useState, useEffect, memo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { motion } from "framer-motion";

import "./collection-item.styles.scss";

import { selectCurrentUser } from "../../redux/user/user-selectors";
import { storage } from "../../firebase/firebase.utils";
import Spinner from "../spinner/spinner.component";
import Like from "../like/like.component";
import { transition } from "../../utils/framer-motion.config";

const CollectionItem = ({ collection, currentUser, history }) => {
  const { id, name, model, price } = collection;
  const [url, setUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const imageData = async () => {
      const imageRef = storage.ref(`images/${id}/`);
      await imageRef
        .list()
        .then((res) =>
          res.items[0].getDownloadURL().then((url) => {
            if (isSubscribed) {
              setUrl(url);
              setIsLoaded(false);
            }
          })
        )
        .catch((err) => console.log(err));
    };
    imageData();
    return () => (isSubscribed = false);
  }, [id]);

  return (
    <motion.div
      transition={transition}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="collection-item"
      onClick={() => history.push(`shop/${id}`)}
    >
      <div className="collection-item__image">
        {isLoaded ? (
          <div className="collection-item__image__raw">
            <Spinner />
          </div>
        ) : (
          <img src={url} alt="bike" className="collection-item__image__raw" />
        )}
      </div>
      <div className="collection-item__body">
        <span className="collection-item__body__name">{name.slice(0, 20)}</span>
        <span className="collection-item__body__model">{model}</span>
        <div className="collection-item__body__icon-container">
          <span
            className="collection-item__body__icon-container__verified"
            title="TORQ MOTOR'S VERIFIED"
          >
            {price} ₹
          </span>
          {currentUser ? <Like id={id} /> : null}
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(memo(CollectionItem)));
