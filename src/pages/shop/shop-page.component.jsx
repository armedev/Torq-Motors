import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import './shop-page.styles.scss';

import {
  firestore,
  convertSnapshotToMapCollections,
} from '../../firebase/firebase.utils';
import ShopPageCollections from '../../components/shop-collections/shop-collections.component';
import Collection from '../../components/collection/collection.component';
import Loader from '../../components/loader/loader.component';
import animationDataLoading from '../../assets/lottie/loadinganimationnormal.json';
import { updateCollections } from '../../redux/shop/shop-actions';
import { selectCurrentUser } from '../../redux/user/user-selectors';

const ShopPageCollectionsWithLoader = Loader(ShopPageCollections);
const CollectionWithLoader = Loader(Collection);

const staggerAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
      direction: 1,
      when: 'afterChildren',
    },
  },
  out: {
    opacity: 0,
  },
};

const ShopPage = ({ updateCollections, match, location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  let lastDoc = useRef(null);

  const handleNextFetch = async () => {
    setIsFetching(true);
    firestore
      .collection('collections')
      .where('attributes.isSold', '==', false)
      .limit(10)
      .startAfter(lastDoc.current)
      .onSnapshot(async (snapshot) => {
        if (!snapshot.empty) {
          lastDoc.current = snapshot.docs[snapshot.docs.length - 1];
          const collectionsMap = await convertSnapshotToMapCollections(
            snapshot
          );
          await updateCollections(collectionsMap);
        }
        setIsFetching(false);
      });
  };

  useEffect(() => {
    try {
      const unSubscribeFromSnapshot = firestore
        .collection('collections')
        .where('attributes.isSold', '==', false)
        .limit(10)
        .onSnapshot(async (snapshot) => {
          if (!snapshot.empty) {
            lastDoc.current = snapshot.docs[snapshot.docs.length - 1];
            const collectionsMap = await convertSnapshotToMapCollections(
              snapshot
            );
            await updateCollections(collectionsMap);
            setIsLoading(false);
          }
        });
      return () => {
        unSubscribeFromSnapshot();
      };
    } catch (error) {
      console.log(error.message);
    }
  }, [updateCollections]);

  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="shop-page"
    >
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route
            exact
            path={match.path}
            render={(props) => (
              <ShopPageCollectionsWithLoader
                isLoading={isLoading}
                animationData={animationDataLoading}
                heightXWidth={200}
                {...props}
                handleNextFetch={handleNextFetch}
                textData={'Loading....'}
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
                heightXWidth={200}
                {...props}
                textData={'Loading....'}
              />
            )}
          />
        </Switch>
      </AnimatePresence>
      {isFetching && (
        <span
          style={{
            position: 'absolute',
            margin: '0px auto',
            left: '50%',
            transform: 'translate(-50%, -100%)',
          }}
        >
          Fetching...
        </span>
      )}
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopPage));
