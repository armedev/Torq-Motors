import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { motion } from "framer-motion";

import "./shop-collections.styles.scss";

import SearchBox from "../search-box/search-box.component";
import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";
import { selectCollections } from "../../redux/shop/shop-selectors";
import { transition } from "../../utils/framer-motion.config";

const ShopPageCollections = ({ collections, history }) => {
  const [searchInput, setSearchInput] = useState("");
  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      collection.attributes.isSold === false &&
      collection.attributes.isAvailable === true
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="shop-collections"
    >
      <div className="shop-collections__header-bar">
        <SearchBox
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <motion.span
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={transition}
          onClick={() => history.push("/sell")}
          className="shop-collections__header-bar__sell"
        >
          Want To Sell?
        </motion.span>
      </div>
      <div className="shop-collections__body">
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))
        ) : (
          <Spinner textData={"No result...."} />
        )}
      </div>
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPageCollections);
