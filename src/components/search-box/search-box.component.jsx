import React from 'react';

import './search-box.styles.scss';
import { ReactComponent as Search } from '../../assets/search.svg';

const SearchBox = ({ searchInput, setSearchInput }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <div className="search-box">
      <div className="search-box__input">
        <input
          type="text"
          value={searchInput}
          name="search"
          placeholder="Search..."
          className="search-box__input__raw"
          onChange={handleChange}
        />
      </div>
      <div className="search-box__icon">
        <Search className="search-box__icon__raw" />
      </div>
    </div>
  );
};

export default SearchBox;
