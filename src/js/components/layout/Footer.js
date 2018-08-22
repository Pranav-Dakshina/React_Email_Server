import React from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

export default class Footer extends React.Component {
  state = {
    toggleAbout: false,
  }

  toggle = () => {
    this.setState({
      toggleAbout: !this.state.toggleAbout,
    })
  }

  render() {
    return (
      <footer>
        <div class="row">
          <div class="foot_cont float-left cursor-pointer" onClick={this.toggle}>
            About
          </div>
          <Modal isOpen={this.state.toggleAbout} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>About</ModalHeader>
            <ModalBody>
               <p>This Website is a Email server created by Thabpet.com.</p>
            </ModalBody>
          </Modal>
          <div class="foot_cont float-left">
            <p>Copyright &copy; Thabpet.com</p>
          </div>
        </div>
      </footer>
    );
  }
}
