import React from "react";


export default class Footer extends React.Component {
  constructor() {
    super();
    this.footerStyles = "footer";
  }

  render() {
    return (
      <footer class={this.footerStyles}>
        <div class="row">
          <div class="col-lg-12">
            <p>Copyright &copy; Thabpet.com</p>
          </div>
        </div>
      </footer>
    );
  }
}
