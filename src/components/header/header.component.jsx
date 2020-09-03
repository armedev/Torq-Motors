import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ match, history, currentUser }) => {
  // console.log(currentUser);
  return (
    <div className="header__header">
      <nav className="header__nav">
        <div className="header__logo__container">
          <Logo className="header__logo" onClick={() => history.push("/")} />
        </div>
        <div className="header__link__container">
          <Link
            to="/shop"
            className={
              match.params.pageId === "shop"
                ? "header__link active"
                : "header__link"
            }
          >
            Shop
          </Link>

          <Link
            to="/about"
            className={
              match.params.pageId === "about"
                ? "header__link active"
                : "header__link"
            }
          >
            About Us
          </Link>
          {currentUser ? (
            <span
              onClick={() => auth.signOut()}
              className="header__link signout"
              title={`signed In as: ${currentUser.email}`}
            >
              Sign Out
            </span>
          ) : (
            <Link
              to="/signin"
              className={
                match.params.pageId === "signin" ||
                match.params.pageId === "signup"
                  ? "header__link active"
                  : "header__link"
              }
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(Header));
