import React from "react"
import { Circle } from "react-shapes"

export default class Bubble extends React.Component {

  render() {

    return (
      <div>
        <div class="bubb">
          <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          <div class="bubb_1">
            <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
          <div class="bubb_2">
            <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
          <div class="bubb_3">
            <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
          <div class="bubb_4">
            <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
          <div class="bubb_5">
            <Circle r={40} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
          <div class="bubb_6">
            <Circle r={30} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
          </div>
        </div>
        <div class="bubb_l2">
        <Circle r={6} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
      </div>
      <div class="bubb_l1">
      <Circle r={3} fill={{color:'#EEEEEE'}} stroke={{color:'#EEEEEE'}} strokeWidth={0} />
    </div>
      </div>
    );
  }
}
