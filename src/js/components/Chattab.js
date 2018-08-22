import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const propTypes = {
  user: PropTypes.object.isRequired
}

@connect()

class Chattab extends React.Component {
  render() {
    const { user } = this.props
    const imgSrc = '/auth/' + user.username + '/profilePic';
    const imgStyle = {
      height: 50,
      width: 50
    }
    return (
      <div class="chattab ml-auto">
        <div class="chatback h-auto w-auto p-1 ml-2 rounded">
          <div class="w-100 d-flex flex-row">
            <div class="p-1">
              <img class="rounded" src={imgSrc} alt="User image" style={imgStyle}/>
            </div>
            <div class="d-flex flex-column">
              <div class="mail-cont_addr pt-1 pl-1">
                {user.firstname}
              </div>
              <small class="text-success pl-1">
                Online
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Chattab.propTypes = propTypes

export default Chattab
