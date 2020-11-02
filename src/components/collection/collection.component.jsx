import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { gsap, Power3 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { withRouter } from "react-router-dom";

import "./collection.styles.scss";
import { ReactComponent as BackArrow } from "../../assets/left-arrow.svg";

import { selectCollection } from "../../redux/shop/shop-selectors";
import { storage } from "../../firebase/firebase.utils";
import Spinner from "../../components/spinner/spinner.component";
import firebase from "../../firebase/firebase.utils";
import Like from "../../components/like/like.component";
import { selectCurrentUser } from "../../redux/user/user-selectors";

gsap.registerPlugin(CSSRulePlugin);

const Collection = ({ Collection, history, currentUser }) => {
  const {
    id,
    name,
    desc,
    model,
    price,
    brand,
    owners,
    insurance,
    kmRan,
    fuelType,
  } = Collection;
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      const imageFolderRef = storage.ref(`images/${id}`);
      await imageFolderRef
        .listAll()
        .then(async (res) => {
          res.items.map((item, index) =>
            index < 7
              ? item.getDownloadURL().then((res) => {
                  setUrls((urls) => [...urls, res]);
                })
              : null
          );
        })
        .catch((error) => alert(error.message));
    };
    dataFetch();
  }, [id]);

  useEffect(() => {
    setSelectedUrl(urls[0]);
  }, [urls]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //animations
  let imageContainerAfter = CSSRulePlugin.getRule(
    ".collection__img__main::after"
  );
  let imageContainerBefore = CSSRulePlugin.getRule(
    ".collection__img__main::before"
  );

  useEffect(() => {
    if (imageLoaded) {
      gsap.to([imageContainerBefore, imageContainerAfter], {
        duration: 2,
        transform: "translateX(-111%) skewX(-2deg)",
        ease: Power3.easeOut,
        delay: 0.3,
        stagger: {
          amount: 0.3,
        },
      });
    } else {
      gsap.to([imageContainerBefore, imageContainerAfter], {
        duration: 0,
        transform: "none",
      });
    }
  }, [imageLoaded, imageContainerBefore, imageContainerAfter]);

  return (
    <div className="collection">
      <div className="collection__img">
        <div className="collection__img__preview">
          {!loading ? (
            urls.map((url, index) => (
              <img
                src={url}
                key={index}
                alt="bike"
                className="collection__img__preview__raw"
                onClick={() => setSelectedUrl(url)}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
        <div className="collection__img__main">
          <img
            src={selectedUrl}
            alt="bike"
            className="collection__img__main__raw"
            onLoad={() => {
              setImageLoaded(true);
              setLoading(false);
            }}
          />
        </div>
      </div>
      <div className="collection__details">
        <div className="collection__details__header">
          <h1 className="collection__details__header__h1">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
        </div>
        <div className="collection__details__body">
          <h3 className="collection__details__body__brand">
            Brand: {brand.toUpperCase()}
          </h3>
          <h3 className="collection__details__body__model">MODEL: {model}</h3>
          <h3 className="collection__details__body__price">
            PRICE: {price} inr
          </h3>
          <h3 className="collection__details__body__owners">
            Owners: {owners} owners
          </h3>
          <h3 className="collection__details__body__km">KM ran: {kmRan} km</h3>
          <h3 className="collection__details__body__fuel">
            Fuel Type: {fuelType}
          </h3>
          <h3 className="collection__details__body__insurance">
            Insurance:{" "}
            {firebase.firestore.Timestamp.now() > insurance
              ? `Expired on `
              : `Valid till `}
            {new Date(insurance.seconds * 1000).toDateString()}
          </h3>
          <p className="collection__details__body__desc">
            {desc.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </p>
        </div>
      </div>
      <div className="collection__footer">
        <div
          className="collection__footer__back"
          onClick={() => history.goBack()}
        >
          <BackArrow className="collection__footer__back-arrow" /> BACK
        </div>
        {currentUser ? <Like id={id} /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  Collection: selectCollection(ownProps.match.params.bikeId)(state),
  currentUser: selectCurrentUser(state),
});

export default React.memo(withRouter(connect(mapStateToProps)(Collection)));
