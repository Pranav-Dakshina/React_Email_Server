import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link, Route} from 'react-router-dom'
import {Tooltip} from 'reactstrap'
import {withCookies, Cookies} from 'react-cookie';

import {instanceOf} from 'prop-types';

import {loginAuthenticate, signinVerify} from '../actions/signInActions'
import {submitSignUp} from '../actions/signUpActions'

import Input from '../components/layout/Input';

@connect((store) => {
  return {signin: store.signin, signup: store.signup, verify: store.signin.verify, message: store.signin.message}
})

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    document.title = 'Thabpet';

    this.popin = {
      animation: 'slidedown 0.3s ease-in',
      display: 'block'
    };
    this.popout = {
      animation: 'popout 0.3s ease-out',
      display: 'none'
    };
    this.state = {
      signInDisplay: false,
      signOutDisplay: false,
      tooltipSignIn: false,
      tooltipSignUp: false,
      show: true,
      apiCalled: false
    };
  }

  componentDidMount() {
    console.log(this.props.signin);
    this.props.dispatch(signinVerify())
  }

  handleClick = (event) => {
    if(event.target.id == 'SignIn' || event.target.id == 'signInIcon') {
      this.setState({
        signInDisplay: !this.state.signInDisplay,
        signUpDisplay: false
      });
    } else {
      this.setState({
        signInDisplay: false,
        signUpDisplay: !this.state.signUpDisplay
      });
    }
  }

  formSubmit = (event) => {
    event.preventDefault();
    let {user} = this.props.signin;
    this.setState({apiCalled: true});
    this.props.dispatch(loginAuthenticate(user.username, user.password));
  }

  formSignUp = (event) => {
    event.preventDefault();
    let {form} = this.props.signup;
    let data = {
      firstname: form.firstname,
      lastname: form.lastname,
      username: form.username,
      password: form.password
    };
    this.setState({apiCalled: true});
    this.props.dispatch(submitSignUp(data));
  }

  toggleSignUpPop = () => {
    this.setState({
      tooltipSignUp: !this.state.tooltipSignUp
    });
  }

  toggleSignInPop = () => {
    this.setState({
      tooltipSignIn: !this.state.tooltipSignIn
    });
  }

  signUpTooltip = () => {
    return <div class="tooltip_style2">
      Create an account
    </div>
  }

  signInTooltip = () => {
    return <div class="tooltip_style">
      Log in to ur account
    </div>
  }

  renderSignUp = () => {
    return (<form class='form' id='formSignUp' name='signUpForm' onSubmit={this.formSignUp} style={this.state.signUpDisplay
        ? this.popin
        : this.popout} noValidate="noValidate">
      <Input id='signUpFname' name='Firstname' type='text'/>
      <Input id='signUpLname' name='Lastname' type='text'/>
      <Input id='signUpUser' name='Username' type='text'/>
      <Input id='signUpPass' name='Password' type='password'/>
      <Input id='signUpCpass' name='Confirm Password' type='password'/>
      <button class='btn btn-primary' type='submit'>Submit</button>
    </form>)
  }

  renderSignIn = () => {
    const {verify} = this.props
    return (<form class='form' id='formSignIn' name='signInForm' onSubmit={this.formSubmit} style={this.state.signInDisplay
        ? this.popin
        : this.popout} noValidate="noValidate">
      <div class='login-err'>
        { !verify && ('Incorrect Username and Password') }
      </div>
      <Input id='username' name='Username' type='text'/>
      <Input id='password' name='Password' type='password'/>
      <button class='btn btn-primary' type='submit'>Submit</button>
    </form>)
  }

  renderMain = () => {
    const {signInDisplay, signUpDisplay, tooltipSignIn, tooltipSignUp} = this.state
    const mainStyle = {
      height: "6rem",
      width: "18rem"
    }
    const signinStyle = {
      fontSize: "2rem",
      color: "white"
    }
    const signupStyle = {
      fontSize: "1.4rem",
      color: "white"
    }

    return (
      <div class="d-flex justify-content-center" style={(signInDisplay || signUpDisplay) ? {marginTop: "10%"} : {marginTop: "30%"} }>
        <div class="d-flex flex-column">
          <div>
            <img src='Thabpet In.png' style={mainStyle}/>
          </div>
          <div class="d-flex flex-row">
            <div name='SignIn' id='SignIn' onClick={this.handleClick} onMouseEnter={this.toggleSignInPop} onMouseLeave={this.toggleSignInPop}>
              <i id="signInIcon" class="fas fa-sign-in-alt" style={signinStyle}></i>
              { tooltipSignIn && this.signInTooltip() }
            </div>
            <div class="ml-auto mt-1" name='SignUp' id='SignUp' onClick={this.handleClick} onMouseEnter={this.toggleSignUpPop} onMouseLeave={this.toggleSignUpPop}>
              <i id="signUpIcon" class="fas fa-user-plus" style={signupStyle}></i>
              { tooltipSignUp && this.signUpTooltip() }
            </div>
          </div>
        </div>
    </div>)
  }

  render() {
    const {cookies} = this.props
    const {fetching} = this.props.signin
    const {submitted} = this.props.signup
    const {apiCalled} = this.state

    return (<Fragment>
      { cookies.get('uid') != null && <div><Redirect to='/mail'/></div> }
      {
        (apiCalled && fetching)
          ? <div>
              <div class="modal fade show d-block">
                <div class="loading">
                  <div class="sk-chasing-dots">
                    <div class="sk-child sk-dot1"></div>
                    <div class="sk-child sk-dot2"></div>
                  </div>
                </div>
              </div>
              <div class="modal-backdrop fade show"></div>
            </div>
          : <Fragment>
              {this.renderMain()}
              {this.renderSignIn()}
              {this.renderSignUp()}
            </Fragment>
      }
    </Fragment>)
  }
};

export default withCookies(Login);
