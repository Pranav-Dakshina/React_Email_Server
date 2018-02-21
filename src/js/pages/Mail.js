import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Draggable from 'react-draggable'
import { toast } from 'react-toastify'

import {sendMail} from '../actions/signInActions.js'

import MailContent from '../components/layout/MailContent'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'

@connect((store) => {
  return {user: store.signin.user, sent: store.signin.sent, }
})

export default class Mail extends React.Component {

  constructor(props) {
    super(props);

    document.title = 'Mail';
    this.state = {
      value: "",
      toggleCompose: false,
      toggleComposeToolTip: false,
      toggleInboxToolTip: false,
      toggleSentToolTip: false,
      toggleDraftsToolTip: false,
      toggleTrashToolTip: false,
      toggleSpamToolTip: false,
      content: this.props.user.content
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.user.content
    })
  }

  ComposeMail = () => {
    this.setState({
      toggleCompose: !this.state.toggleCompose,
    })
  }

  handleFilter = (value) => {
    if (value.length > 0) {
      this.setState({
        content: this.props.user.content.filter((data) =>
           (data.to.toLowerCase().includes(value.toLowerCase()) ||
            data.subject.toLowerCase().includes(value.toLowerCase()) ||
            data.from.toLowerCase().includes(value.toLowerCase())))
      })
    } else {
      this.setState({
        content: this.props.user.content.slice()
      })
    }
  }



  handleOnChange = (event) => {

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

  submitMail = () => {
    this.props.user.send.from = this.props.user.username;
    this.props.dispatch(sendMail(this.props.user.send));
    toast.success('Message sent',{position: toast.POSITION.TOP_RIGHT} );
    this.ComposeMail();
  }

  render() {

    return (
      <Fragment>
        <Search handleFilter={this.handleFilter}/>
        <div>
          <div class="msgtab">
             <Sidebar />
          </div>
          <div class="conttab">
             {this.state.content.map((cont,index) => {
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
      </Fragment>
    )
  }
};
