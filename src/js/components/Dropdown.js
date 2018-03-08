import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { instanceOf } from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
         Modal, ModalHeader, ModalBody } from 'reactstrap'

import { reset } from '../actions/signInActions'

@connect((store) => {
  return {user: store.signin.user,}
})

class Dpdown extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    state = {
      dropdownOpen: false,
      toggleSettings: false
    };

    toggle = () => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    settings = () => {
      this.setState({
        toggleSettings: !this.state.toggleSettings
      });
    }

    signOut = () => {
      const { cookies } = this.props;
      this.props.dispatch(reset());
      cookies.remove('uid');
    }

    renderSettings = () => {
      return <Modal isOpen={this.state.toggleSettings} toggle={this.settings}>
                <ModalHeader toggle={this.settings}>Settings</ModalHeader>
                <ModalBody>
                   This Website is a Email server created by Thabpet.com.
                </ModalBody>
             </Modal>
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
        <Fragment>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
            <DropdownToggle className="dp_down" color="transparent">
              <img src={imgSrc} alt="" style={imgStyle} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Thabpet</DropdownItem>
              <DropdownItem onClick={this.settings}>Settings</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={this.signOut}>
              <Link to="/" >Sign Out</Link></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {this.renderSettings()}
        </Fragment>
      );
    }
}

export default withCookies(Dpdown);
