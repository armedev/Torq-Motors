import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop-page.component";
import SignIn from "./pages/sign-in/sign-in.component";
import ContactPage from "./pages/contact/contact-page.component";
import HomePage from "./pages/home/home-page.component";
import Loader from "./components/loader/loader.component.jsx";

const HomePageWithLoader = Loader(HomePage);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => <HomePageWithLoader isLoading={isLoading} />}
      />
      <Route exact path="/:pageId" component={Header} />
      <Switch>
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/contact" component={ContactPage} />
      </Switch>
    </div>
  );
}

export default App;
