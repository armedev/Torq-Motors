import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.scss";
import animationDataGears from "./assets/lottie/loading.json";

import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop-page.component";
import ContactPage from "./pages/contact/contact-page.component";
import AboutPage from "./pages/about/about-page.component";
import HomePage from "./pages/home/home-page.component";
import Loader from "./components/loader/loader.component.jsx";
import { default as SignIn } from "./pages/sign-in/sign-in.container";
import { default as SignUp } from "./pages/sign-up/sign-up.container";
import { default as AddPage } from "./pages/add/add-page.container";
import { default as SellPage } from "./pages/sell/sell-page.container";
import { selectCurrentUser } from "./redux/user/user-selectors";
import { setCurrentUser } from "./redux/user/user-actions";
import { updateLiked } from "./redux/liked/liked-actions";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";
import Spinner from "./components/spinner/spinner.component";

const HomePageWithLoader = Loader(HomePage);

const App = ({ setCurrentUser, currentUser, updateLiked }) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  useEffect(() => {
    let unSubscribeFromAuth = null;
    unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          const { liked } = snapShot.data();
          if (liked) {
            updateLiked(liked);
          }
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unSubscribeFromAuth();
    };
  }, [setCurrentUser, updateLiked]);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => (
          <HomePageWithLoader
            isLoading={isLoading}
            animationData={animationDataGears}
            textData={"Welcome...."}
          />
        )}
      />
      <Route path="/:pageId" component={Header} />
      <Switch>
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          exact
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route
          exact
          path="/add"
          render={() =>
            currentUser ? <AddPage currentUser={currentUser} /> : <Spinner />
          }
        />
        <Route
          exact
          path="/sell"
          render={() =>
            currentUser ? (
              <SellPage currentUser={currentUser} />
            ) : (
              <Spinner textData={"plz Sign In to Submit"} />
            )
          }
        />
      </Switch>
      <Route path="/:pageId" component={Footer} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  updateLiked: (likedArray) => dispatch(updateLiked(likedArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
