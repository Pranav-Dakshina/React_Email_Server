import React from "react"
import {connect} from "react-redux"
// import Iframe from 'react-iframe'

@connect((store) => {
  return {user: store.signin.user,}
})

export default class Input extends React.Component {
  state = {
    toggleMailView: false,
  }

  mailViewTrue = (event) => {
    this.setState({
      toggleMailView: true,
    });
  }

  mailViewFalse = (event) => {
    this.setState({
      toggleMailView: false,
    });
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
      <div>
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
        <div class={this.state.toggleMailView ?
          "mail_view display_block z-8" :
          "mail_view display_none z-4"} >
          <div class="wid fl_left">
            <h2 class="wid_90 fl_left">{cont.subject}</h2>
            <a class="fl_left close_sign cur_pt fs_30" onClick={this.mailViewFalse}>&times;</a>
          </div>
          <div class="wid fl_left">
            <strong>
              {cont.from}
            </strong>
          </div>
          <div class="wid fl_left">
            <strong>
              <span>To: </span>
              <a>
                 {cont.to};
              </a>
            </strong>
          </div>
          <div class="wid fl_left mail_view_html">
            cont.body.text
          </div>
        </div>
      </div>
    );
  }
}
