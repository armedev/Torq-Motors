import React, { useState } from "react";

import "./collection-item.styles.scss";

import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartOutline } from "../../assets/heart-outline.svg";

const CollectionItem = ({ imageUrl, name, model }) => {
  const [inLiked, setInLiked] = useState(false);

  const handleLikeClick = () => {
    inLiked ? setInLiked(false) : setInLiked(true);
  };

  return (
    <div className="collection-item">
      <div className="collection-item__image">
        <img
          src="https://images.unsplash.com/photo-1551040096-afacb90386de"
          alt="bike"
          className="collection-item__image__raw"
        />
      </div>
      <div className="collection-item__body">
        <span className="collection-item__body__name">
          HERo honda splendor pro
        </span>
        <span className="collection-item__body__model">2019</span>
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

export default CollectionItem;
