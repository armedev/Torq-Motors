import React, { useRef } from "react";
import { gsap, Elastic } from "gsap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./like.styles.scss";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartOutline } from "../../assets/heart-outline.svg";

import { selectLiked } from "../../redux/liked/liked-selectors";
import { firestore } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { withRouter } from "react-router-dom";

const Like = ({ currentUser, history, id, liked }) => {
  let heartRef = useRef(null);

  const updateLogicForLiked = async () => {
    const currentUserRef = firestore.doc(`users/${currentUser.id}`);
    if (!liked.includes(id)) {
      await currentUserRef
        .set(
          {
            liked: [...liked, id],
          },
          { merge: true }
        )
        .catch((err) => console.log(err));
    } else {
      liked.splice(liked.indexOf(id), 1);
      await currentUserRef
        .set(
          {
            liked: [...liked],
          },
          { merge: true }
        )
        .catch((err) => console.log(err));
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    if (currentUser) {
      gsap.from(heartRef, {
        duration: 0.5,
        transform: "scale(0)",
        ease: Elastic.easeOut,
      });

      await updateLogicForLiked();
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
      {liked.includes(id) ? (
        <Heart className="heart-active" />
      ) : (
        <HeartOutline className="heart" />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  liked: selectLiked,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(Like));
