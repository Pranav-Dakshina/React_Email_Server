import React from "react"
import {connect} from "react-redux"
import { Popover, PopoverBody } from "reactstrap"

import {verifyUser} from "../../actions/signUpActions.js"
import Bubble from "./../Bubble.js"
import ErrorIcon from "./../ErrorIcon.js"
import SuccessIcon from "./../SuccessIcon.js"

@connect((store) => {
  return {user: store.signin.user, verifyUser: store.signup.form}
})

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.divStyle = "inp";
    this.state = {
      toggleFocus: false,
      toggleError: false,
      toggleVerifyUser: false,
      togglePopover: false,
      toggleMinEight: false,
      toggleIsLower: false,
      toggleIsUpper: false,
      toggleIsNum: false,
      toggleIsSpecial: false,
      toggleEmailValid: false,
      passShow: false,
      userShow: false,
      formValid: false,
    };

  }

  isEmpty = (event) => {
    if (event.target.value.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  minEight = (event) => {
    if (event.target.value.length > 7) {
      this.setState({toggleMinEight: true});
    }
    else {
      this.setState({toggleMinEight: false});
    }
  }

  isLower = (event) => {
    var regex = /[a-z]+/;
    if (regex.test(event.target.value)) {
      this.setState({toggleIsLower: true});
    }
    else {
      this.setState({toggleIsLower: false});
    }
  }

  isUpper = (event) => {
    var regex = /[A-Z]+/;
    if (regex.test(event.target.value)) {
      this.setState({toggleIsUpper: true});
    }
    else {
      this.setState({toggleIsUpper: false});
    }
  }

  isSpecial = (event) => {
    var regex = /[~@#$%^&*()_+={}|;',?]+/;
    if (regex.test(event.target.value)) {
      this.setState({toggleIsSpecial: true});
    }
    else {
      this.setState({toggleIsSpecial: false});
    }
  }

  emailValid = (event) => {
    var regex = /\b^[a-z][a-z][a-z][a-z]+\w*[_.]*[a-z0-9]+$\b/;
    if (regex.test(event.target.value)) {
      this.setState({toggleEmailValid: true});
    }
    else {
      this.setState({toggleEmailValid: false});
    }
  }

  isNum = (event) => {
    var regex = /[0-9]+/;
    if (regex.test(event.target.value)) {
      this.setState({toggleIsNum: true});
    }
    else {
      this.setState({toggleIsNum: false});
    }
  }

  handleOnFocus = (event) => {
    this.setState({toggleFocus: true});
    switch (true) {
    case (event.target.name == 'signUpPass'): {
      this.setState({passShow: true, passTarget: event.target});
      break;
    }
    case (event.target.name == 'signUpUser'): {
      this.setState({userShow: true, userTarget: event.target, toggleVerifyUser: false});
      break;
    }
  }
  }

  handleOnBlur = (event) => {
    if (this.isEmpty(event)) {
      this.setState({toggleFocus: false});
    } else {
      switch (true) {
        case (event.target.name == 'signUpUser'): {
          if ((event.target.value.length > 7) && this.state.toggleEmailValid) {
            this.props.dispatch(verifyUser(this.props.verifyUser.username));
            this.setState({toggleVerifyUser: true});
          }
          break;
        }
      }
    }
    this.setState({passShow: false, userShow: false});
  }

  handleOnChange = (event) => {
    console.log(this.props);
    if (this.isEmpty(event)) {
      this.error = this.props.name + " can't be empty ";
      this.setState({toggleError: true});
      if (event.target.name == 'signUpPass') {
        this.setState({
          toggleMinEight: false,
          toggleIsLower: false,
          toggleIsUpper: false,
          toggleIsNum: false,
          toggleIsSpecial: false,
        });
      }
    } else {
      this.error = "";
      this.setState({toggleError: false});

      switch (event.target.name) {
        case 'username':
          {
            this.props.user.username = event.target.value;
            break;
          }
        case 'password':
          {
            this.props.user.password = event.target.value;
            break;
          }
        case 'signUpFname':
          {
            this.props.verifyUser.firstname = event.target.value;
            break;
          }
        case 'signUpLname':
          {
            this.props.verifyUser.lastname = event.target.value;
            break;
          }
        case 'signUpUser':
          {
            this.props.verifyUser.username = event.target.value;
            this.minEight(event);
            this.emailValid(event);
            break;
          }
        case 'signUpPass':
          {
            this.props.verifyUser.password = event.target.value;
            this.isLower(event);
            this.isUpper(event);
            this.minEight(event);
            this.isNum(event);
            this.isSpecial(event);
            break;
          }
          case 'signUpCpass':
            {
              if (event.target.value == this.props.verifyUser.password) {
                this.error = "";
                this.setState({toggleError: false});
              } else {
                this.error = " Password doesn't match ";
                this.setState({toggleError: true});
              }
            }
      }
    }
  }

  render() {

    return (
      <div class="fl_left">
        <div class={this.divStyle}>
          <label class={this.state.toggleFocus
            ? "labelText label_focus"
            : "labelText label_unfocus"} htmlFor={this.props.id}>
            <span>
              {this.props.name}
            </span>
          </label>
          <input class={this.state.toggleFocus
            ? "inpt inpt_focus"
            : "inpt inpt_unfocus"} type={this.props.type} id={this.props.id} name={this.props.id} onChange={this.handleOnChange} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} required/>
        </div>
        <div class={this.state.toggleError
          ? "err_msg err_msg_true"
          : "err_msg err_msg_false"}>
          {this.error}
        </div>
        <div class={this.state.toggleVerifyUser
          ? "display_block"
          : "display_none"}>
          <Bubble/>
          <div class="verify_user">
            Username is {this.props.verifyUser.available
              ? "available"
              : "not available"}
          </div>
        </div>
        <Popover className="pop_wid" isOpen={this.state.passShow} target='signUpPass' placement="right">
          <PopoverBody>
            <div class="popover_content popover_title">
              <em>Password Rules</em>
            </div>
            <div class="popover_content">
              {this.state.toggleMinEight ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleMinEight ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"} >Minimum 8 characters</div>
            </div>
            <div class="popover_content">
              {this.state.toggleIsLower ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleIsLower ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"}>Atleast one Lowercase Letter</div>
            </div>
            <div class="popover_content">
              {this.state.toggleIsUpper ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleIsUpper ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"}>Atleast one Uppercase Letter</div>
            </div>
            <div class="popover_content">
              {this.state.toggleIsNum ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleIsNum ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"}>Atleast one Number</div>
            </div>
            <div class="popover_content">
              {this.state.toggleIsSpecial ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleIsSpecial ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"}>Atleast one Special Characters</div>
            </div>
          </PopoverBody>
        </Popover>
        <Popover className="pop_wid" isOpen={this.state.userShow} target='signUpUser' placement="right">
          <PopoverBody>
            <div class="popover_content popover_title">
              <em>Username Rules</em>
            </div>
            <div class="popover_content">
              {this.state.toggleMinEight ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleMinEight ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"} >Minimum 8 characters</div>
            </div>
            <div class="popover_content">
              {this.state.toggleEmailValid ? <SuccessIcon/> : <ErrorIcon/> }
              <div class={this.state.toggleEmailValid ? "fl_left popover_in_cont opac_6" : "fl_left popover_in_cont"}>Email invalid</div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
