import React, { useRef, useState } from 'react';

import './search-box.styles.scss';
import { ReactComponent as Search } from '../../assets/search.svg';

import {
  convertSnapshotToMapCollections,
  firestore,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop-actions';
import { connect } from 'react-redux';

const SearchBox = ({ updateCollections, setSearchInput }) => {
  const [inputChange, setInputChange] = useState('');
  let status = useRef(null);
  const handleChange = (e) => {
    const { value } = e.target;
    setInputChange(value);
    if (value === '') {
      e.target.blur();
      setSearchInput('');
    }
    status.current = true;
  };

  const handleSearch = async (e) => {
    if (inputChange !== '' && status) {
      e.target.blur();
      firestore
        .collection('collections')
        .where('main.name', '>=', inputChange)
        .where('main.name', '<=', inputChange + '\uf8ff')
        .limit(10)
        .onSnapshot(async (snapshot) => {
          const collectionsMap = await convertSnapshotToMapCollections(
            snapshot
          );
          await updateCollections(collectionsMap);
          setSearchInput(inputChange);
          status.current = false;
        });
    }
  };

  return (
    <div className="search-box">
      <div className="search-box__input">
        <input
          type="text"
          value={inputChange}
          name="search"
          placeholder="Search..."
          className="search-box__input__raw"
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSearch(e) : 0)}
        />
      </div>
      <Search
        onClick={handleSearch}
        style={{
          width: '30px',
          height: '30px',
          margin: '0px 5px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(0, mapDispatchToProps)(SearchBox);
