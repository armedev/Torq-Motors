import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";

import "./collection.styles.scss";
import { ReactComponent as BackArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as ContactUs } from "../../assets/message-rocket.svg";

import { selectCollection } from "../../redux/shop/shop-selectors";
import { storage } from "../../firebase/firebase.utils";
import Spinner from "../../components/spinner/spinner.component";

import "./collection.styles.scss";
import { withRouter } from "react-router-dom";

const Collection = ({ Collection, history }) => {
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState([]);
  const { id, name, description, model, price } = Collection[0];

  useEffect(() => {
    const dataFetch = async () => {
      const imageFolderRef = storage.ref(`images/${id}`);
      await imageFolderRef
        .listAll()
        .then(async (res) => {
          res.items.map((item) =>
            item.getDownloadURL().then((res) => {
              setUrls((urls) => [...urls, res]);
            })
          );
        })
        .then(() => setTimeout(() => setLoading(false), 3000))
        .catch((error) => alert(error.message));
    };
    dataFetch();
  }, [id]);
  return (
    <div className="collection">
      <div className="collection__img">
        {!loading ? (
          <AliceCarousel className="alice-carousel" fadeOutAnimation={true}>
            {urls.map((url, index) => (
              <img
                src={url}
                key={index}
                alt="bike"
                className="collection__img__raw"
              />
            ))}
          </AliceCarousel>
        ) : (
          <Spinner />
        )}
      </div>
      <div className="collection__details">
        <div className="collection__details__header">
          <h1 className="collection__details__header__h1">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
        </div>
        <div className="collection__details__body">
          <h3 className="collection__details__body__model">MODEL: {model}</h3>
          <h3 className="collection__details__body__price">
            PRICE: {price} inr
          </h3>
          <p className="collection__details__body__desc">
            {description.split("*")}
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
        <div
          className="collection__footer__contact"
          onClick={() => history.push("/contact")}
        >
          Contact Us
          <ContactUs className="collection__footer__contact-us" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  Collection: selectCollection(ownProps.match.params.bikeId)(state),
});

export default React.memo(withRouter(connect(mapStateToProps)(Collection)));
