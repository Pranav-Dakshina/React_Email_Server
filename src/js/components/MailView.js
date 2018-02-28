import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  cont: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.array.isRequired
  })
}

const MailView = ({ cont }) => {
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
    <div class="mail_view display_block z-8" >
      <div class="wid fl_left">
        <h2 class="wid_90 fl_left">{cont.subject}</h2>
        <a class="fl_left close_sign cur_pt fs_30">&times;</a>
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

MailView.propTypes = propTypes

export default MailView
