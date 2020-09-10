import React, { useState } from "react";

import "./shop-page.styles.scss";
import "./shop-page.animations.scss";

import SearchBox from "../../components/search-box/search-box.component";
import CollectionItem from "../../components/collection-item/collection-item.component";
import Spinner from "../../components/spinner/spinner.component";

const ShopPage = ({ collections }) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="shop-page">
      <div className="shop-page__header-bar">
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        <span className="shop-page__header-bar__sell">Want To Sell?</span>
      </div>
      <div className="shop-page__body">
        {filteredCollections.length ? (
          filteredCollections.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))
        ) : (
          <h1
            style={{
              color: "#f64352",
              fontSize: 20,
            }}
          >
            <Spinner />
            No items :{"("} try checking your connection or modifying your
            result
          </h1>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
