import React from "react"
import {connect} from "react-redux"
import { Route, Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'

import { instanceOf } from 'prop-types'

import Mail from "./../../pages/Mail"

@connect((store) => {
  return {user: store.signin.user, }
})

class AuthorizedRoute extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    const { user, cookies } = this.props;

    return (
      <Route path={this.props.path} render={props => (
        cookies.get('uid') != null
        ? ( <Mail {...props} />  )
        : ( <Redirect to={{ pathname: '/', state: { from: props.location } }}/> )
      )} />
    );
  }
}

export default withCookies(AuthorizedRoute);
