import React, { useState, useEffect, memo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collection-item.styles.scss";

import { selectCurrentUser } from "../../redux/user/user-selectors";
import { storage } from "../../firebase/firebase.utils";
import Spinner from "../spinner/spinner.component";
import Like from "../like/like.component";

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
    <div className="collection-item" onClick={() => history.push(`shop/${id}`)}>
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(memo(CollectionItem)));
