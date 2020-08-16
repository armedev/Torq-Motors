import React from "react";
import { Route } from "react-router-dom";

import "./App.scss";

import Header from "./components/header/header.component";
import ShopPage from "./pages/shop/shop-page.component";
import SignIn from "./pages/sign-in/sign-in.component";
import ContactPage from "./pages/contact/contact-page.component";
import HomePage from "./pages/home/home-page.component";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:pageId" component={Header} />
      <Route exact path="/shop" component={ShopPage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/contact" component={ContactPage} />
    </div>
  );
}

export default App;
