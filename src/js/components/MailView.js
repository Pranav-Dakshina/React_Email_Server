import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { mailViewRemove } from '../actions/mailViewActions.js'

const propTypes = {
  cont: PropTypes.shape({
    from: PropTypes.array.isRequired,
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
      <div class="mail-view flex-grow-1 d-block z-8 rounded" >
        <div class="d-flex">
          <h2 class="flex-grow-1">{cont.subject}</h2>
          <a class="close-sign cursor-pointer fs-30" onClick={this.mailViewRemove}>&times;</a>
        </div>
        <div>
          <strong>
            {cont.from[0].name ? cont.from[0].name + ' <' + cont.from[0].address + '>'
                               : cont.from[0].address}
          </strong>
        </div>
        <div class="d-flex">
          <strong>
            To:
          </strong>
          <a>
             {cont.to.map((to, index) => {
               return to.name ? to.name + ' <' + to.address + '>; '
                              : to.address + '; '
             })}
          </a>
        </div>
        <div class="mail-view-html" dangerouslySetInnerHTML={{ __html: cont.html }} >
        </div>
      </div>
    )
  }
}

MailView.propTypes = propTypes

export default MailView
