import React from 'react'
import {connect} from 'react-redux'
import { Redirect, Link, Route } from 'react-router-dom'
import { Tooltip } from 'reactstrap'
import { withCookies, Cookies } from 'react-cookie';

import { instanceOf } from 'prop-types';

import { loginAuthenticate } from '../actions/signInActions'
import { submitSignUp } from '../actions/signUpActions'

import Input from '../components/layout/Input';

@connect((store) => {
  return {user: store.signin.user, verifyUser: store.signup.form, verify: store.signin.verify,}
})

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    document.title = 'Thabpet';

    this.popin = {
      animation: 'popin 0.3s ease-in',
      display: 'block'
    };
    this.popout = {
      animation: 'popout 0.3s ease-out',
      display: 'none'
    };
    this.state = {
      toggleSignInDisplay: true,
      TooltipSignIn: false,
      TooltipSignUp: false,
      show: true
    };
    // this.handleClick = this.handleClick.bind(this);
    // this.formSubmit = this.formSubmit.bind(this);
    // this.formSignUp = this.formSignUp.bind(this);
    // this.toggleSignUpPop = this.toggleSignUpPop.bind(this);
    // this.toggleSignInPop = this.toggleSignInPop.bind(this);
  }

  handleClick = () => {
    var bool = this.state.toggleSignInDisplay;
    this.setState({
      toggleSignInDisplay: !bool
    });
  }

  formSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(loginAuthenticate(this.props.user.username, this.props.user.password));
  }

  formSignUp = (event) => {
    event.preventDefault();
    let data = {
      firstname: this.props.verifyUser.firstname,
      lastname: this.props.verifyUser.lastname,
      username: this.props.verifyUser.username,
      password: this.props.verifyUser.password,
    }
    this.props.dispatch(submitSignUp(data));
  }

  toggleSignUpPop = () => {
    this.setState({
      TooltipSignUp: !this.state.TooltipSignUp,
    });
  }

  toggleSignInPop = () => {
    this.setState({
      TooltipSignIn: !this.state.TooltipSignIn,
    });
  }

  render() {
    const iconStyle = {
      width: '30px',
      height: '30px',
    };

    const tooltipStyle = {
      position: 'absolute',
      backgroundColor: 'transparent',
      color: 'white',
      fontWeight: '400',
      textShadow: '2px 2px 2px #000000',
      marginLeft: -150,
      marginTop: -50,
      width: 150,
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

    const { cookies } = this.props;

    return (
      <div>
        { cookies.get('uid') != null
          ? <div><Redirect to='/mail' /></div>
          : ' ' }
        <div>
          <form class='form' id='formSignIn' name='signInForm' onSubmit={this.formSubmit} style={this.state.toggleSignInDisplay
            ? this.popin
            : this.popout} noValidate>
            <div class='login-err'>
              {(this.props.verify != false) ? ' ' : 'Incorrect Username and Password'}
            </div>
            <div name='SignUp' id='SignUp' onClick={this.handleClick} onMouseEnter={this.toggleSignUpPop} onMouseLeave={this.toggleSignUpPop}>
              <img id='signUpImg' src='signUp_white.png' alt='' style={iconStyle} />
                {this.state.TooltipSignUp ? signUpTooltip : <div></div>}
            </div>
            <Input id='username' name='Username' type='text'/>
            <Input id='password' name='Password' type='password'/>
            <button class='btn btn-primary' type='submit'>Submit</button>
          </form>
          <form class='form' id='formSignUp' name='signUpForm' onSubmit={this.formSignUp} style={this.state.toggleSignInDisplay
            ? this.popout
            : this.popin} noValidate>
            <div name='SignIn' id='SignIn' onClick={this.handleClick} onMouseEnter={this.toggleSignInPop} onMouseLeave={this.toggleSignInPop}>
              <img id='signInImg' src='signIn_white.png' alt='' style={iconStyle}/>
              {this.state.TooltipSignIn ? signInTooltip : ''}
            </div>
            <Input id='signUpFname' name='Firstname' type='text'/>
            <Input id='signUpLname' name='Lastname' type='text'/>
            <Input id='signUpUser' name='Username' type='text'/>
            <Input id='signUpPass' name='Password' type='password'/>
            <Input id='signUpCpass' name='Confirm Password' type='password'/>
            <button class='btn btn-primary' type='submit' >Submit</button>
          </form>
        </div>
      </div>
    )
  }
};

export default withCookies(Login);
