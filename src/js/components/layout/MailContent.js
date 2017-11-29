import React from "react"
import {connect} from "react-redux"
import Iframe from 'react-iframe'

@connect((store) => {
  return {user: store.signin.user, verifyUser: store.signup.form}
})

export default class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      toggleMailView: false,
    }
    this.mailView = this.mailView.bind(this);
  }

  mailView() {
    this.setState({
      toggleMailView: !this.state.toggleMailView,
    });
  }

  render() {
    const { cont } = this.props;

    const htmlView = (
      <html>
      <head></head>
      <body>
        <h1>w3schools</h1>
        <h2>Checking</h2>
      </body>
      </html>
    );

    return (
      <div>
      <div class="mail_cont fl_left" onClick={this.mailView}>
         <div class="mail_cont_addr">
           {cont.header.from[0]}
         </div>
         <div class="mail_cont_subj">
           {cont.header.subject[0]}
         </div>
      </div>
      <div class={this.state.toggleMailView ?
        "mail_view display_block" :
        "mail_view display_none"} >
        <div class="wid fl_left">
          <h2>{cont.header.subject[0]}</h2>
        </div>
        <div class="wid fl_left">
          {cont.header.from[0]}
        </div>
        <div class="wid fl_left">
          To:
          {cont.header.to.map((to,index)=>{
            return (
              <a key={"to"+index}>
                 {to};
              </a>
            )
          })}
        </div>
        <Iframe className="wid fl_left mail_view_html" url="https://www.google.com/"/>
      </div>
      </div>
    );
  }
}
