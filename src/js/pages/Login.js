import React from "react"
import ReactDOM from "react-dom"
// import {Link} from "react-router";
import {connect} from "react-redux"
import {OverlayTrigger, Tooltip} from "react-bootstrap"

import {loginAuthenticate} from "../actions/signInActions.js"
import {submitSignUp} from "../actions/signUpActions.js"

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Input from "../components/layout/Input";

@connect((store) => {
  return {user: store.signin.user, verifyUser: store.signup.form}
})

export default class Login extends React.Component {
  constructor() {
    super();
    this.popin = {
      animation: "popin 0.3s ease-in",
      display: "block"
    };
    this.popout = {
      animation: "popout 0.3s ease-out",
      display: "none"
    };
    this.state = {
      toggleSignInDisplay: true,
      show: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.loginAuth = this.loginAuth.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.formSignUp = this.formSignUp.bind(this);
    this.togglePop = this.togglePop.bind(this);
  }

  handleClick() {
    var bool = this.state.toggleSignInDisplay;
    this.setState({
      toggleSignInDisplay: !bool
    });
  }

  loginAuth() {
    this.props.dispatch(loginAuthenticate(this.props.user.username, this.props.user.password));
  }

  handleInput(event) {
    console.log(event.target);
  }

  formSubmit(event) {
    event.preventDefault();
    alert("Success");
  }

  formSignUp(event) {
    event.preventDefault();
    let data = {
      firstname: this.props.verifyUser.firstname,
      lastname: this.props.verifyUser.lastname,
      username: this.props.verifyUser.username,
      password: this.props.verifyUser.password,
    }
    this.props.dispatch(submitSignUp(data));
  }

  togglePop() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const signUpStyle = {
      width: "30px",
      height: "30px"
    };

    const signInStyle = {
      width: "30px",
      height: "30px",
      opacity: "1"
    };

    const tooltipStyle = {
      ...this.props.style,
      position: 'absolute',
      backgroundColor: 'transparent',
      color: 'white',
      fontWeight: '300',
      textShadow: '2px 2px 4px #000000',
      marginLeft: -5,
      marginTop: 0,
      padding: 10
    }

    const signUpTooltip = (
      <div style={tooltipStyle}>
        Create an account
      </div>
    );

    const signInTooltip = (
      <div style={tooltipStyle}>
        Log in to ur account
      </div>
    );

    return (
      <div>

        <Header/>

        <div>
          <div class="container">
            <form class="form" id="formSignIn" name="signInForm" onSubmit={this.formSubmit} style={this.state.toggleSignInDisplay
              ? this.popin
              : this.popout} noValidate>
              <div class="login-err"></div>
              <div name="SignUp" id="SignUp">
                <OverlayTrigger placement="top" overlay={signUpTooltip}>
                  <img id="signUpImg" src="signUp.png" alt="" onClick={this.handleClick} style={signUpStyle}/>
                </OverlayTrigger>
              </div>
              <Input id="username" name="Username" type="text"/>
              <Input id="passsword" name="Password" type="password"/>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
            <form class="form" id="formSignUp" name="signUpForm" onSubmit={this.formSignUp} style={this.state.toggleSignInDisplay
              ? this.popout
              : this.popin} noValidate>
              <div name="SignIn" id="SignIn">
                <OverlayTrigger placement="top" overlay={signInTooltip}>
                  <img id="signInImg" src="signIn.png" alt="" onClick={this.handleClick} style={signInStyle}/>
                </OverlayTrigger>
              </div>
              <Input id="signUpFname" name="Firstname" type="text"/>
              <Input id="signUpLname" name="Lastname" type="text"/>
              <Input id="signUpUser" name="Username" type="text"/>
              <Input id="signUpPass" name="Password" type="password"/>
              <Input id="signUpCpass" name="Confirm Password" type="password"/>
              <button class="btn btn-primary" type="submit" >Submit</button>
            </form>
          </div>
        </div>

        <Footer/>

      </div>
    )
  }
};
