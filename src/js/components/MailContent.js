import React from "react"
import {connect} from "react-redux"

import { mailViewAdd } from '../actions/mailViewActions.js'

@connect((store) => {
  return {
    user: store.mailview
  }
})

export default class MailContent extends React.Component {
  mailViewAdd = () => {
    let { cont, ind } = this.props

    this.props.dispatch(mailViewAdd(cont, ind));
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
      <div class="mail_cont float-left" onClick={this.mailViewAdd}>
         <img class="float-left" style={imgStyle} src="avatar.jpg" alt="avatar.jpg" />
         <div class="float-left" id="mail_cont_det">
           <div class="mail_cont_addr">
             {cont.from[0].name ? cont.from[0].name
                                : cont.from[0].address}
           </div>
           <div class="mail_cont_subj">
             {cont.subject}
           </div>
         </div>
      </div>
    );
  }
}
