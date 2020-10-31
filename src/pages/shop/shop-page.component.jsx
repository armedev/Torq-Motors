import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./shop-page.styles.scss";

import {
  firestore,
  convertSnapshotToMapCollections,
} from "../../firebase/firebase.utils";
import ShopPageCollections from "../../components/shop-collections/shop-collections.component";
import Collection from "../../components/collection/collection.component";
import Loader from "../../components/loader/loader.component";
import animationDataLoading from "../../assets/lottie/loadinganimationnormal.json";
import { updateCollections } from "../../redux/shop/shop-actions";
import { selectCurrentUser } from "../../redux/user/user-selectors";

const ShopPageCollectionsWithLoader = Loader(ShopPageCollections);
const CollectionWithLoader = Loader(Collection);

const ShopPage = ({ updateCollections, match }) => {
  const [isLoading, setIsLoading] = useState(true);

  // console.log(match);

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
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        render={(props) => (
          <ShopPageCollectionsWithLoader
            isLoading={isLoading}
            animationData={animationDataLoading}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}/:bikeId`}
        render={(props) => (
          <CollectionWithLoader
            key={props}
            isLoading={isLoading}
            animationData={animationDataLoading}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
