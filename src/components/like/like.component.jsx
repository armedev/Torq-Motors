import React, { useRef, useState } from "react";
import { gsap, Elastic } from "gsap";

import "./like.styles.scss";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartOutline } from "../../assets/heart-outline.svg";

const Like = ({ currentUser, history, id }) => {
  const [inLiked, setInLiked] = useState(false);
  let heartRef = useRef(null);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (currentUser) {
      gsap.from(heartRef, {
        duration: 0.5,
        transform: "scale(0)",
        ease: Elastic.easeOut,
      });
      setInLiked(!inLiked);
    } else {
      alert("you need to be signed in to do that :(");
      history.push("/signin");
    }
  };
  return (
    <div
      className="like"
      ref={(el) => (heartRef = el)}
      onClick={handleLikeClick}
    >
      {inLiked ? (
        <Heart className="heart-active" />
      ) : (
        <HeartOutline className="heart" />
      )}
    </div>
  );
};

export default Like;
