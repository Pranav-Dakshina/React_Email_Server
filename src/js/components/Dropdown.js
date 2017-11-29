import React from 'react'
import {connect} from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { instanceOf } from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { reset } from '../actions/signInActions'

@connect((store) => {
  return {user: store.signin.user,}
})

class Dpdown extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.signOut = this.signOut.bind(this);
      this.state = {
        dropdownOpen: false
      };
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    signOut() {
      console.log("signOut");
      const { cookies } = this.props;
      this.props.dispatch(reset());
      cookies.remove('uid');
    }

  render() {
    const imgSrc = '/auth/'+ this.props.user.username +'/profilePic';
    const imgStyle = {
      width: 30,
      height: 30,
      border: 'none',
      borderRadius: 2,
    }
    const dpStyle = {
      background: 'transparent !important',
      padding: '3px !important',
    }

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
        <DropdownToggle className="dp_down" color="transparent">
          <img src={imgSrc} alt="" style={imgStyle} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Thabpet</DropdownItem>
          <DropdownItem></DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.signOut}>
          <Link to="/" >Sign Out</Link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default withCookies(Dpdown);
