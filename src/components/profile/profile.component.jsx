import React, { useEffect, useRef, useState } from "react";
import { gsap, Power3 } from "gsap";

import "./profile.styles.scss";
import { ReactComponent as User } from "../../assets/user.svg";

import { auth } from "../../firebase/firebase.utils";

const Profile = ({ currentUser }) => {
  let dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      gsap.to(dropdownRef, {
        opacity: 1,
        height: "150px",
        duration: 1,
        visibility: "visible",
        ease: Power3.easeInOut,
      });
    } else {
      gsap.to(dropdownRef, {
        height: "0px",
        duration: 1,
        opacity: 0,
        ease: Power3.easeInOut,
      });
      gsap.to(dropdownRef, {
        duration: 0,
        visibility: "hidden",
        delay: 1,
      });
    }
  });

  return (
    <div className="profile">
      <div className="profile__logo" onClick={() => setIsActive(!isActive)}>
        <User className="profile__logo__raw" />
      </div>
      <div className="profile__dropdown" ref={(el) => (dropdownRef = el)}>
        <li className="profile__dropdown__currentuser">
          signed in as{" "}
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </li>
        <span
          className="profile__dropdown__signout"
          onClick={() => auth.signOut()}
          title={`signed In as: ${currentUser.email}`}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
