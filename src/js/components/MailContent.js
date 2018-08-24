import React from "react"
import {connect} from "react-redux"
import axios from 'axios'
import {$} from 'jquery'

import {mailViewAdd} from '../actions/mailViewActions.js'

@connect((store) => {
  return {user: store.mailview}
})

export default class MailContent extends React.Component {
  state = {
    senderThumbnail: 'avatar.jpg'
  }
  componentDidMount() {
    this.getAvatar()
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      senderThumbnail
    } = this.state
    if (prevState.senderThumbnail !== senderThumbnail) {
    //   window.$('.lazyload').each(function() {
    //     //* set the img src from data-src
    //     window.$(this).attr('src', window.$(this).attr('data-src'));
    //   });
    }
  }
  getAvatar = () => {
    const {from} = this.props.cont
    const url = `http://picasaweb.google.com/data/entry/api/user/${from[0].address}?alt=json`
    axios.get(url).then((response) => {
      console.log("JSON: ", response.data.entry.gphoto$thumbnail.$t)
      this.setState({senderThumbnail: response.data.entry.gphoto$thumbnail.$t})
    }).catch((error) => console.error(error))
  }
  mailViewAdd = () => {
    let {cont, ind} = this.props

    this.props.dispatch(mailViewAdd(cont, ind));
  }

  render() {
    const {cont} = this.props;
    const {senderThumbnail} = this.state

    const imgStyle = {
      width: 50,
      height: 50,
      borderRadius: '25%'
    };

    return (<div class="mail-cont" onClick={this.mailViewAdd}>
      <img class="float-left lazyload" style={imgStyle} src={senderThumbnail} alt="avatar.jpg"/>
      <div class="float-left ml-2">
        <div>
          {
            cont.from[0].name
              ? cont.from[0].name
              : cont.from[0].address
          }
        </div>
        <div class="mail-cont-subject">
          {cont.subject}
        </div>
        <div class="mail-cont-text text-muted text-truncate">{cont.text}</div>
      </div>
    </div>);
  }
}
