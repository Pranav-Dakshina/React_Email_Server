import React, { Fragment } from 'react'
import {connect} from 'react-redux'
// import { withCookies, Cookies } from 'react-cookie'
// import { Link } from 'react-router-dom'
// import { instanceOf } from 'prop-types'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

@connect((store) => {
  return {user: store.signin.user,}
})

export default class Dpdown extends React.Component {

  constructor() {
      super();

    }

  render() {

    return (
      <Fragment>
        <input id="search" class="srch fl_left" placeholder="Search" />
        <img class="fl_left" id="img_srch" src="search2.png" />
      </Fragment>
    );
  }
}
