import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import Draggable from 'react-draggable'
import { toast } from 'react-toastify'

import {sendMail} from '../actions/signInActions.js'

import MailContent from '../components/MailContent'
import MailView from '../components/MailView'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'

@connect((store) => {
  return {
    user: store.signin.user,
    sent: store.signin.sent,
    cont: store.mailview.content
  }
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
      content: this.props.user.content,
      view: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.user.content,
      view: nextProps.cont
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
<<<<<<< HEAD
          (data.to.toLowerCase().includes(value.toLowerCase()) ||
           data.subject.toLowerCase().includes(value.toLowerCase()) ||
           data.from.toLowerCase().includes(value.toLowerCase())))
=======
           (data.to.toLowerCase().includes(value.toLowerCase()) ||
            data.subject.toLowerCase().includes(value.toLowerCase()) ||
            data.from.toLowerCase().includes(value.toLowerCase())))
>>>>>>> 8431d9e0dab0df21b9917ae5f49e3369146152d3
      })
    } else {
      this.setState({
        content: this.props.user.content.slice()
      })
    }
  }

  handleOnChange = (event) => {
   let { send } = this.props.user
   switch (event.target.name) {
      case 'to':
        {
          send.to = event.target.value;
          break;
        }
      case 'subject':
        {
          send.subject = event.target.value;
          break;
        }
      case 'message':
        {
          send.text = event.target.value;
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
                 <MailContent cont={cont} key={index} ind={index} />
               )
             })}
          </div>
          <div class="chattab">
          </div>
          {this.state.view.length > 0
           ?  this.state.view.map((cont,index) => {
                return (
                  <MailView cont={cont} key={index} />
                )
              })
           : ''
          }
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
