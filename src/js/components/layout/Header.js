import React from 'react'
import {Route, Link} from 'react-router-dom'

import Dpdown from './../Dropdown'

const Header = () => {

  return (<header>
    <div class='float-left div_hd_icon'>
      <Route path='/mail' render={() => (<Link to='/'><img src='Thabpet In.png' class='thabpet'/></Link>)}/>
    </div>
    <div class='float-right header_icon'>
      <Route path='/mail' component={Dpdown}/>
    </div>
  </header>)
}

export default Header;
