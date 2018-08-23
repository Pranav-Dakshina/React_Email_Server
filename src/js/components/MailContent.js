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

    const imgStyle = {
      width: 50,
      height: 50,
      borderRadius: '25%',
    };

    return (
      <div class="mail-cont" onClick={this.mailViewAdd}>
          <img class="float-left" style={imgStyle} src="avatar.jpg" alt="avatar.jpg" />
         <div class="float-left ml-2">
           <div>
             {cont.from[0].name ? cont.from[0].name
                                : cont.from[0].address}
           </div>
           <div class="mail-cont-subject">
             {cont.subject}
           </div>
           <div class="mail-cont-text text-muted text-truncate">{cont.text}</div>
         </div>
      </div>
    );
  }
}
