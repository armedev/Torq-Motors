import React from "react";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./header.styles.scss";

const Header = ({ match, history }) => {
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
          <Link
            to="/signin"
            className={
              match.params.pageId === "signin"
                ? "header__link active"
                : "header__link"
            }
          >
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
