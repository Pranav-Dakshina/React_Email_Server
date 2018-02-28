import React from "react"
import {connect} from "react-redux"

// import Iframe from 'react-iframe'

import { mailView } from '../actions/mailViewActions.js'

@connect((store) => {
  return {
    user: store.mailview
  }
})

export default class MailContent extends React.Component {
  mailViewTrue = () => {
    let { cont, ind } = this.props

    this.props.dispatch(mailView(cont, ind));
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
      <div class="mail_cont fl_left" onClick={this.mailViewTrue}>
         <img class="fl_left" style={imgStyle} src="avatar.jpg" alt="avatar.jpg" />
         <div class="fl_left" id="mail_cont_det">
           <div class="mail_cont_addr">
             {cont.from}
           </div>
           <div class="mail_cont_subj">
             {cont.subject}
           </div>
         </div>
      </div>
    );
  }
}
