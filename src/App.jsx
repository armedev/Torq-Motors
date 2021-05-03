import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AnimatePresence } from 'framer-motion';

import './App.scss';
import animationDataGears from './assets/lottie/loading.json';

import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop-page.component';
import ContactPage from './pages/contact/contact-page.component';
import AboutPage from './pages/about/about-page.component';
import HomePage from './pages/home/home-page.component';
import ServicePage from './pages/Repairservice/service.component';
import EmailVerify from './pages/emailVerify/emailVerify.component';
import Loader from './components/loader/loader.component.jsx';
import { default as SignIn } from './pages/sign-in/sign-in.container';
import { default as SignUp } from './pages/sign-up/sign-up.container';
// import { default as AddPage } from "./pages/add/add-page.container";
import { default as SellPage } from './pages/sell/sell-page.container';
import { selectCurrentUser } from './redux/user/user-selectors';
import { setCurrentUser } from './redux/user/user-actions';
import { updateLiked } from './redux/liked/liked-actions';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import Spinner from './components/spinner/spinner.component';
import { withRouter } from 'react-router-dom';
import Forgot from './pages/forgot/forgot.component';
import Flash from './components/flash/flash.component';
import Bus from './utils/helpers/bus';

window.flash = (message, type = 'success') =>
  Bus.emit('flash', { message, type });

const HomePageWithLoader = Loader(HomePage);

const App = ({
  setCurrentUser,
  currentUser,
  updateLiked,
  location,
  history,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  const [isNotVerified, setIsNotVerified] = useState(false);

  useEffect(() => {
    let unSubscribeFromAuth = null;
    unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({ id: userAuth.uid, ...userAuth });
          const { liked } = snapShot.data();
          if (liked) {
            updateLiked(liked);
          }
        });
        setIsNotVerified(!userAuth.emailVerified);
      } else {
        setIsNotVerified(false);
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unSubscribeFromAuth();
    };
  }, [setCurrentUser, updateLiked]);

  useEffect(() => {
    if (isNotVerified && location.pathname !== '/') {
      history.push('/verify');
    }
  }, [history, location.pathname, isNotVerified]);

  return (
    <div className="App">
      <Flash />
      <Route path="/:pageId" component={Header} />
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageWithLoader
              isLoading={isLoading}
              animationData={animationDataGears}
              heightXWidth={300}
              textData={''}
            />
          )}
        />
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch key={location.pathname} location={location}>
                <Route path="/buy" component={ShopPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/contact" component={ContactPage} />
                <Route
                  exact
                  path="/signin"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignIn />
                  }
                />
                <Route
                  exact
                  path="/signup"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignUp />
                  }
                />
                {/* <Route
                  exact
                  path="/add"
                  render={() =>
                    currentUser ? (
                      <AddPage currentUser={currentUser} />
                    ) : (
                      <Spinner />
                    )
                  }
                /> */}
                <Route
                  exact
                  path="/sell"
                  render={() =>
                    currentUser ? (
                      <SellPage currentUser={currentUser} />
                    ) : (
                      <div
                        style={{
                          minHeight: '82vh',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Spinner textData={'Sign In To Proceed'} />
                      </div>
                    )
                  }
                />
                <Route exact path="/service" render={() => <ServicePage />} />
                <Route exact path="/verify" render={() => <EmailVerify />} />
                <Route exact path="/forgot" render={() => <Forgot />} />
              </Switch>
            </AnimatePresence>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
