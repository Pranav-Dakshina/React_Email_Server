import React from "react"
import {connect} from "react-redux"
// import Iframe from 'react-iframe'

@connect((store) => {
  return {user: store.signin.user,}
})

export default class MailContent extends React.Component {
  state = {
    toggleMailView: false,
  }

  mailViewTrue = (event) => {
    this.setState({
      toggleMailView: true,
    });
  }

  mailViewFalse = (event) => {
    this.setState({
      toggleMailView: false,
    });
  }

  render() {
    const { cont } = this.props;

    const bodyStyle = {
      overflow: 'auto',
      width: '800',
      height: '600',
    };

    const bSize = {
      fontSize: '40',
    };

    const imgStyle = {
      width: 50,
      height: 50,
      borderRadius: '25%',
    };

    return (
      <div>
        <div class="mail-cont float-left" onClick={this.mailViewTrue}>
           <img class="float-left" style={imgStyle} src="avatar.jpg" alt="avatar.jpg" />
           <div class="float-left" id="mail-cont_det">
             <div class="mail-cont_addr">
               {cont.from[0].name}
             </div>
             <div class="mail-cont-subject">
               {cont.subject}
             </div>
           </div>
        </div>
        <div class={this.state.toggleMailView ?
          "mail-view d-block z-8" :
          "mail-view d-none z-4"} >
          <div class="wid float-left">
            <h2 class="wid_90 float-left">{cont.subject}</h2>
            <a class="float-left close-sign cursor-pointer fs-30" onClick={this.mailViewFalse}>&times;</a>
          </div>
          <div class="wid float-left">
            <strong>
              {cont.from}
            </strong>
          </div>
          <div class="wid float-left">
            <strong>
              <span>To: </span>
              <a>
                 {cont.to};
              </a>
            </strong>
          </div>
          <div class="wid float-left mail-view-html">
            cont.body.text
          </div>
        </div>
      </div>
    );
  }
}
