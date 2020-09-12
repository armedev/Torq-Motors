import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./collection.styles.scss";

import { selectCollection } from "../../redux/shop/shop-selectors";
import { storage } from "../../firebase/firebase.utils";

import "./collection.styles.scss";

const Collection = ({ Collection }) => {
  const [urls, setUrls] = useState([]);

  const { id, name, description, model, price } = Collection[0];
  useEffect(() => {
    const imageFolderRef = storage.ref(`images/${id}`);
    imageFolderRef.listAll().then((res) =>
      res.items.map((item) =>
        item.getDownloadURL().then((res) => {
          setUrls((urls) => [...urls, res]);
        })
      )
    );
  }, [id]);

  console.log(urls);
  return (
    <div className="collection">
      {id}
      {name}
      {description}
      {model}
      {price}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  Collection: selectCollection(ownProps.match.params.bikeId)(state),
});

export default connect(mapStateToProps)(Collection);
