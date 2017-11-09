import React from "react";


export default class Header extends React.Component {

  loadHome() {
    window.location.href = 'https://thabpet.com/';
  }

  render() {

    return (
      <header>
        <div class="thabpet" onclick={this.loadHome.bind(this)} >
          Thabpet
        </div>
      </header>
    );
  }
}
