import React from 'react'
import { Route, Link } from 'react-router-dom'

import Dpdown from './../Dropdown.js'

export default class Header extends React.Component {

  render() {

    return (
      <header>
        <div class='fl_left'>
          <Link to='/' class='thabpet'>Thabpet</Link>
        </div>
        <div class='fl_left'>
          <Route path='/mail' component={Dpdown} />
        </div>
        <div class='fl_right header_icon'>
          <Route path='/mail' component={Dpdown} />
        </div>
      </header>
    );
  }
}
