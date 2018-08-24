import React from 'react'
import {Route, Link} from 'react-router-dom'

import Dpdown from './../Dropdown'

const Header = () => {

  return (<header>
    <div className='float-left div_hd_icon'>
      <Route path='/mail' render={() => (<Link to='/'><img src='Thabpet In.png' className='thabpet'/></Link>)}/>
    </div>
    <div className='float-right header_icon'>
      <Route path='/mail' component={Dpdown}/>
    </div>
  </header>)
}

export default Header;
