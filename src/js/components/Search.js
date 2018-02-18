import React from 'react'
// import { withCookies, Cookies } from 'react-cookie'
// import { Link } from 'react-router-dom'
// import { instanceOf } from 'prop-types'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class Search extends React.Component {

  handleOnChange = (event) => {
    this.props.handleFilter(event.target.value)
  }

  render() {

    return (
      <div class='div_srch' >
        <img class="fl_left" id="img_srch" src="search2.png" />
        <input id="search" class="srch fl_left" placeholder="Search" onChange={this.handleOnChange} />
      </div>
    );
  }
}
