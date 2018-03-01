import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { mailViewRemove } from '../actions/mailViewActions.js'

const propTypes = {
  cont: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.array.isRequired
  })
}

@connect()

class MailView extends React.Component {
  mailViewRemove = () => {
    this.props.dispatch(mailViewRemove());
  }

  render() {
    const { cont } = this.props
    return (
      <div class="mail_view display_block z-8" >
        <div class="wid fl_left">
          <h2 class="wid_90 fl_left">{cont.subject}</h2>
          <a class="fl_left close_sign cur_pt fs_30" onClick={this.mailViewRemove}>&times;</a>
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
    )
  }
}

MailView.propTypes = propTypes

export default MailView
