import React from "react"
import {connect} from "react-redux"
import { Route, Switch, Redirect } from "react-router-dom"
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Login from "./Login"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import AuthorizedRoute from "../components/layout/AuthorizedRoute";

@connect((store) => {
  return {user: store.signin.user, }
})

class Index extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    if (cookies.get('beenHereBefore') == 'yes') {
      cookie.set('uid', null);
    }
  }

  render() {

    return (
      <div>
        <div>
          <img id="bg" src="backs2.jpeg" alt="" />
          <canvas id="rain" />
        </div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <AuthorizedRoute path="/mail" />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    )
  }
};

export default withCookies(Index);
