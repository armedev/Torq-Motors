import React, { useState } from "react";

import "./shop-page.styles.scss";

import SearchBox from "../../components/search-box/search-box.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

const ShopPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="shop-page">
      <div className="shop-page__header-bar">
        <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />
        <span className="shop-page__header-bar__sell">Want To Sell?</span>
      </div>
      <div className="shop-page__body">
        <CollectionItem />
        <CollectionItem />
        <CollectionItem />
        <CollectionItem />
      </div>
    </div>
  );
};

export default ShopPage;
