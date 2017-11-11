import React from "react"
import { Link} from "react-router-dom"

export default class Header extends React.Component {
  constructor() {
    super();
    this.refreshPage = this.refreshPage.bind(this);
  }
  refreshPage() {
    window.location.reload();
  }
  render() {
    return (
      <header>
        <div class="thabpet" onClick={this.refreshPage}>
             Thabpet
        </div>
      </header>
    );
  }
}
