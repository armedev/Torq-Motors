import React, { useState } from "react";

import "./shop-page.styles.scss";

import SearchBox from "../../components/search-box/search-box.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

const ShopPage = ({ collections }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="shop-page">
      <div className="shop-page__header-bar">
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        <span className="shop-page__header-bar__sell">Want To Sell?</span>
      </div>
      <div className="shop-page__body">
        {collections
          .filter((collection) =>
            collection.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))}
      </div>
    </div>
  );
};

export default ShopPage;
