import React from 'react'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Draggable from 'react-draggable'
import { toast } from 'react-toastify'

import {sendMail} from '../actions/signInActions.js'

import MailContent from '../components/layout/MailContent'

@connect((store) => {
  return {user: store.signin.user, sent: store.signin.sent, }
})

export default class Mail extends React.Component {
  state = {
    toggleCompose: false,
    toggleToolTip: false,
  }
  constructor() {
    super();

    document.title = 'Mail';
    this.state = {
      value: "",
    }

    this.ComposeMail = this.ComposeMail.bind(this);
    this.ToolTip = this.ToolTip.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.submitMail = this.submitMail.bind(this);
  }

  ComposeMail() {
    this.setState({
      toggleCompose: !this.state.toggleCompose,
    })
  }

  ToolTip() {
    this.setState({
      toggleToolTip: !this.state.toggleToolTip,
    })
  }

  handleOnChange(event) {

  switch (event.target.name) {
    case 'to':
      {
        this.props.user.send.to = event.target.value;
        break;
      }
    case 'subject':
      {
        this.props.user.send.subject = event.target.value;
        break;
      }
    case 'message':
      {
        this.props.user.send.text = event.target.value;
        break;
      }
  }

  }

  submitMail() {
    this.props.user.send.from = this.props.user.username;
    this.props.dispatch(sendMail(this.props.user.send));
    toast.success('Message sent',{position: toast.POSITION.TOP_RIGHT} );
    this.ComposeMail();
  }

  render() {

    const ComposeTooltip = (
      <div class="tool_tip2">
        Compose
      </div>
    );
    const InboxTooltip = (
      <div class="tool_tip2">
        Inbox
      </div>
    );
    const SentTooltip = (
      <div class="tool_tip2">
        Sent
      </div>
    );
    const DraftsTooltip = (
      <div class="tool_tip2">
        Drafts
      </div>
    );
    const TrashTooltip = (
      <div class="tool_tip2">
        Trash
      </div>
    );
    const SpamTooltip = (
      <div class="tool_tip2">
        Spam
      </div>
    );

    return (
      <div>
        <div class="msgtab">
           <i class="fa fa-pencil fs_30 msgtab_icon_bot" aria-hidden="true" onClick={this.ComposeMail} onMouseEnter={this.ToolTip} onMouseLeave={this.ToolTip}></i>
           {this.state.toggleToolTip ? ComposeTooltip : <div></div>}
           <i class="fa fa-inbox fs_30 msgtab_icon_bot" aria-hidden="true"></i>
           {this.state.toggleToolTip ? InboxTooltip : <div></div>}
           <i class="fa fa-paper-plane fs_28 msgtab_icon_bot" aria-hidden="true"></i>
           {this.state.toggleToolTip ? SentTooltip : <div></div>}
           <i class="fa fa-file-text fs_28 msgtab_icon_bot" aria-hidden="true"></i>
           {this.state.toggleToolTip ? DraftsTooltip : <div></div>}
           <i class="fa fa-trash fs_30 msgtab_icon_bot" aria-hidden="true"></i>
           {this.state.toggleToolTip ? TrashTooltip : <div></div>}
           <i class="fa fa-shield fs_30 msgtab_icon_bot" aria-hidden="true"></i>
           {this.state.toggleToolTip ? SpamTooltip : <div></div>}
        </div>
        <div class="conttab">
           {this.props.user.content.map((cont,index)=>{
             return (
               <MailContent cont={cont} key={"cont"+index} />
             )
           })}
        </div>
          <div class={this.state.toggleCompose ? "new_mail display_block" : "new_mail display_none" }>
            <div class="head_top bor_top">
              <div class="head_top_title">New Mail</div>
              <div class="head_top_icon">_</div>
              <div class="head_top_icon" onClick={this.ComposeMail}>&times;</div>
            </div>
            <div class="clearfix" />
            <div class="new_mail_cont">
               <input class="head_send head_inp" name="to" type="text" onChange={this.handleOnChange} placeholder="To" />
               <input class="head_send head_inp" name="subject" type="text" onChange={this.handleOnChange} placeholder="Subject" />
               <div>
                 <textarea class="head_inp head_body" name="message" onChange={this.handleOnChange} placeholder="Message" />
               </div>
            </div>
            <div class="new_mail_cont pd_left_80 bor_bottom">
                 <Button color="success" onClick={this.submitMail}>Send</Button>
            </div>
          </div>
      </div>
    )
  }
};
