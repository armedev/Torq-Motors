import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collection-item.styles.scss";

import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartOutline } from "../../assets/heart-outline.svg";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { storage } from "../../firebase/firebase.utils";
import Spinner from "../spinner/spinner.component";

const CollectionItem = ({ collection, currentUser, history }) => {
  const { id, name, model } = collection;
  const [inLiked, setInLiked] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const imageRef = storage.ref(`images/${id}/main.jpg`);
    imageRef.getDownloadURL().then((url) => {
      setUrl(url);
      setIsLoaded(false);
    });
  }, [id]);

  const handleLikeClick = () => {
    if (currentUser) {
      setInLiked(!inLiked);
    } else {
      alert("you need to be signed in to that :(");
      history.push("/signin");
    }
  };

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
            title="HERO MOTOR'S VERIFIED"
          >
            &#10022;
          </span>
          <div
            className="collection-item__body__icon-container__liked"
            onClick={handleLikeClick}
          >
            {inLiked ? (
              <Heart className="heart-active" />
            ) : (
              <HeartOutline className="heart" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(CollectionItem));
