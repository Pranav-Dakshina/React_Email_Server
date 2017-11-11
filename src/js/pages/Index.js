import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login"
import Mail from "./Mail"
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default class Index extends React.Component {

  render() {

    return (
      <div>
        <div>
          <img id="bg" src="backs2.gif" alt="" />
        </div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/mail" component={Mail} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    )
  }
};
