import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { instanceOf } from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
         Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from 'axios'

import { reset } from '../actions/signInActions'
// import ImgUploader from './ImgUploader'

import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

@connect((store) => {
  return {user: store.signin.user,}
})

class Dpdown extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    state = {
      dropdownOpen: false,
      toggleSettings: false,
      toggleDp: false
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

    Dp = () => {
      this.setState({
        toggleDp: !this.state.toggleDp
      });
    }

    signOut = () => {
      const { cookies } = this.props;
      this.props.dispatch(reset());
      cookies.remove('uid');
    }

    fileHandler = (event) => {
      // const file = event.target.files[0];
      const data = new FormData();
      data.append('file', event.target.files[0]);
      data.append('filename', 'upload');
      // console.log("File : ", file);
      axios.post("/chgDp", data)
           .then(() => console.log("Successfully uploaded"), () => console.log("Unsuccessfully uploaded"))
           .catch((error) => console.log("Upload Error : ", error))
    }

    imgModal = () => {
      if(this.state.toggleDp) {
      return <Modal isOpen={this.state.toggleDp} toggle={this.imgOnClick}>
                <ModalHeader toggle={this.imgOnClick}>Image</ModalHeader>
                <ModalBody>
                   <input id="uploadDp" type="file" class="d-none" accept="image/*" onChange={this.fileHandler}/>
                   <label class="cursor-pointer" htmlFor="uploadDp">Upload</label>
                </ModalBody>
             </Modal>
      }
    }

    imgOnClick = () => {
      this.setState({
        toggleDp: !this.state.toggleDp
      });
    }

    renderSettings = () => {
      const imgSrc = '/auth/'+ this.props.user.username +'/profilePic';
      return <Modal isOpen={this.state.toggleSettings} toggle={this.settings}>
                <ModalHeader toggle={this.settings}>Settings</ModalHeader>
                <ModalBody>
                  <div class="sett_dp">
                    <img class="sett_img" src={imgSrc} alt="avatar.jpg" />
                    <div class="sett_hover" onClick={this.imgOnClick}>
                      <div class="sett_dp_text" >
                        <i class="fa fa-camera" aria-hidden="true"></i>
                        <strong> Change</strong>
                      </div>
                    </div>
                  </div>
                </ModalBody>
             </Modal>
      }

    render() {
      const imgSrc = '/auth/'+ this.props.user.username +'/profilePic';
      const dpStyle = {
        background: 'transparent !important',
        padding: '3px !important',
      }

      return (
        <Fragment>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
            <DropdownToggle className="dp_down" color="transparent">
              <img class="img_style rounded" src={imgSrc} alt="" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Thabpet</DropdownItem>
              <DropdownItem onClick={this.settings}>Settings</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={this.signOut}>
                <Link to="/" >Sign Out</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {this.imgModal()}
          {this.renderSettings()}
        </Fragment>
      );
    }
}

export default withCookies(Dpdown);
