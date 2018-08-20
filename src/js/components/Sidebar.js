import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      toggleCompose: false,
      toggleComposeToolTip: false,
      toggleInboxToolTip: false,
      toggleSentToolTip: false,
      toggleDraftsToolTip: false,
      toggleTrashToolTip: false,
      toggleSpamToolTip: false
    }
  }

  toolTip = (event) => {
    switch (event.target.id) {
      case 'compose':
      {
        this.setState({
          toggleComposeToolTip: !this.state.toggleComposeToolTip,
        })
        break;
      }
      case 'inbox':
      {
        this.setState({
          toggleInboxToolTip: !this.state.toggleInboxToolTip,
        })
        break;
      }
      case 'sent':
      {
        this.setState({
          toggleSentToolTip: !this.state.toggleSentToolTip,
        })
        break;
      }
      case 'drafts':
      {
        this.setState({
          toggleDraftsToolTip: !this.state.toggleDraftsToolTip,
        })
        break;
      }
      case 'trash':
      {
        this.setState({
          toggleTrashToolTip: !this.state.toggleTrashToolTip,
        })
        break;
      }
      case 'spam':
      {
        this.setState({
          toggleSpamToolTip: !this.state.toggleSpamToolTip,
        })
        break;
      }
    }

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
      <Fragment>
        <i class="fas fa-pencil-alt fs_30 msgtab_icon_bot" id="compose" aria-hidden="true" onClick={this.props.composeMail} onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleComposeToolTip ? ComposeTooltip : <div></div>}
        <i class="fas fa-envelope fs_30 msgtab_icon_bot" id="inbox" aria-hidden="true" onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleInboxToolTip ? InboxTooltip : <div></div>}
        <i class="fas fa-paper-plane fs_30 msgtab_icon_bot" id="sent" aria-hidden="true" onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleSentToolTip ? SentTooltip : <div></div>}
        <i class="fas fa-file-alt fs_30 msgtab_icon_bot" id="drafts" aria-hidden="true" onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleDraftsToolTip ? DraftsTooltip : <div></div>}
        <i class="fas fa-trash fs_30 msgtab_icon_bot" id="trash" aria-hidden="true" onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleTrashToolTip ? TrashTooltip : <div></div>}
        <i class="fas fa-minus-circle fs_30 msgtab_icon_bot" id="spam" aria-hidden="true" onMouseEnter={this.toolTip} onMouseLeave={this.toolTip}></i>
          {this.state.toggleSpamToolTip ? SpamTooltip : <div></div>}
      </Fragment>
    )
  }
}

Sidebar.propTypes = {
  composeMail: PropTypes.func.isRequired
}

export default Sidebar
