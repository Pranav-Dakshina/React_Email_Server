import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import Draggable from 'react-draggable'
import {toast} from 'react-toastify'
// import IdleTimer from 'react-idle-timer';

import {sendMail, newMail} from '../actions/signInActions.js'
import {NEW_MAIL} from '../../../config/Events'
import Chattab from '../components/Chattab'
import MailContent from '../components/MailContent'
import MailView from '../components/MailView'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import io from "socket.io-client";

const socketUrl = "localhost:8080"

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

    this.scrollDown = this.scrollDown.bind(this)
  }

  componentDidMount() {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    this.initSocket()
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

  initSocket = () => {
    this.socket = io(socketUrl)
    this.socket.on(NEW_MAIL, (mail) => {
      this.socket.emit("RECEIVED")
      this.props.dispatch(newMail(mail))
    })
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
        <Chattab user={user} />
        <div class={this.state.toggleCompose
            ? "new_mail d-block"
            : "new_mail d-none"}>
          <div class="head_top bor_top">
            <div class="head_top_title">New Mail</div>
            <div class="head_top_icon">_</div>
            <div class="head_top_icon" onClick={this.composeMail}>&times;</div>
          </div>
          <div class="clearfix"/>
          <div class="new_mail-cont">
            <input class="head_send head_inp" name="to" type="text" onChange={this.handleOnChange} placeholder="To"/>
            <input class="head_send head_inp" name="subject" type="text" onChange={this.handleOnChange} placeholder="Subject"/>
            <div>
              <textarea class="head_inp head_body" name="message" onChange={this.handleOnChange} placeholder="Message"/>
            </div>
          </div>
          <div class="new_mail-cont pd_left_80 bor_bottom">
            <Button color="success" onClick={this.submitMail}>Send</Button>
          </div>
        </div>
      </div>
    </Fragment>)
  }
}

export default Mail
