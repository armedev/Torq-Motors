import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  firestore,
  convertSnapshotToMapCollections,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop-actions";
import { selectCollections } from "../../redux/shop/shop-selectors";
import ShopPageCollections from "../../components/shop-collections/shop-collections.component";
import Loader from "../../components/loader/loader.component";
import animationDataLoading from "../../assets/lottie/loadinganimationnormal.json";

const ShopPageWithLoader = Loader(ShopPageCollections);

const ShopPage = ({ updateCollections, collections }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const unSubscribeFromSnapshot = firestore
        .collection("collections")
        .onSnapshot(async (snapshot) => {
          const collectionsMap = await convertSnapshotToMapCollections(
            snapshot
          );
          // console.log(collectionsMap);
          await updateCollections(collectionsMap);
          setIsLoading(false);
        });
      return () => {
        unSubscribeFromSnapshot();
      };
    } catch (error) {
      console.log(error.message);
    }
  }, [updateCollections]);

  return (
    <ShopPageWithLoader
      isLoading={isLoading}
      animationData={animationDataLoading}
      collections={collections}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
