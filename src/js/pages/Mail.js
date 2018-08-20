import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import Draggable from 'react-draggable'
import {toast} from 'react-toastify'
// import IdleTimer from 'react-idle-timer';

import {sendMail} from '../actions/signInActions.js'

import MailContent from '../components/MailContent'
import MailView from '../components/MailView'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import io from "socket.io-client";

@connect((store) => {
  return {user: store.signin.user, sent: store.signin.sent, cont: store.mailview.content}
})

class Mail extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user) {
      return {content: nextProps.user.content, view: nextProps.cont}
    }
  }

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

    this.socket = io('localhost:8080')

    this.scrollDown = this.scrollDown.bind(this)
  }

  componentDidMount() {
    this.scrollDown()
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown()
  }

  composeMail = () => {
    this.setState({
      toggleCompose: !this.state.toggleCompose
    })
  }

  handleFilter = (value) => {
    const {content} = this.props.user
    if (value.length > 0) {
      this.setState({
        content: content.filter((data) => (data.to.some((val) => val.address.toLowerCase().includes(value.toLowerCase()) || val.name.toLowerCase().includes(value.toLowerCase())) || data.subject.toLowerCase().includes(value.toLowerCase()) || data.from.some((val) => val.address.toLowerCase().includes(value.toLowerCase()) || val.name.toLowerCase().includes(value.toLowerCase())) || data.text.toLowerCase().includes(value.toLowerCase())))
      })
    } else {
      this.setState({content: content.slice()})
    }
  }

  handleOnChange = (event) => {
    let {send} = this.props.user
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

  scrollDown() {
    const {conttab} = this.refs
    conttab.scrollTop = 0
  }

  submitMail = () => {
    this.props.user.send.from = this.props.user.username;
    this.props.dispatch(sendMail(this.props.user.send));
    toast.success('Message sent', {position: toast.POSITION.TOP_RIGHT});
    this.composeMail();
  }

  render() {
    const {user} = this.props
    const imgSrc = '/auth/' + user.username + '/profilePic';
    const imgStyle = {
      height: 50,
      width: 50
    }

    return (<Fragment>
      <Search handleFilter={this.handleFilter}/>
      <div class="maintab w-100 d-flex">
        <div class="msgtab">
          <Sidebar composeMail={this.composeMail}/>
        </div>
        <div ref='conttab' class="conttab d-flex flex-column-reverse">
          {
            this.state.content.map((cont, index) => {
              return (<MailContent cont={cont} key={index} ind={index}/>)
            })
          }
        </div>
          {
            this.state.view.length > 0
              ? this.state.view.map((cont, index) => {
                return (<MailView cont={cont} key={index}/>)
              })
              : ''
          }
        <div class="chattab rounded-left">
          <div class="chatback h-auto w-auto p-1 rounded">
            <div class="w-100 d-flex flex-row">
              <div class="p-1">
                <img class="rounded" src={imgSrc} alt="User image" style={imgStyle}/>
              </div>
              <div class="d-flex flex-column">
                <div class="mail_cont_addr pt-1 pl-1">
                  {user.firstname}
                </div>
                <small class="text-success pl-1">
                  Online
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class={this.state.toggleCompose
            ? "new_mail display_block"
            : "new_mail display_none"}>
          <div class="head_top bor_top">
            <div class="head_top_title">New Mail</div>
            <div class="head_top_icon">_</div>
            <div class="head_top_icon" onClick={this.composeMail}>&times;</div>
          </div>
          <div class="clearfix"/>
          <div class="new_mail_cont">
            <input class="head_send head_inp" name="to" type="text" onChange={this.handleOnChange} placeholder="To"/>
            <input class="head_send head_inp" name="subject" type="text" onChange={this.handleOnChange} placeholder="Subject"/>
            <div>
              <textarea class="head_inp head_body" name="message" onChange={this.handleOnChange} placeholder="Message"/>
            </div>
          </div>
          <div class="new_mail_cont pd_left_80 bor_bottom">
            <Button color="success" onClick={this.submitMail}>Send</Button>
          </div>
        </div>
      </div>
    </Fragment>)
  }
}

export default Mail
