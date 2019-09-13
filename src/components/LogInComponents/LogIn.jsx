import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

const modalStyle = () => {
  return {
    height: 300
  };
};
const failedMsgStyle = () => {
  return {
    color: "red"
  };
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.isOpen = this.isOpen.bind(this);
    this.isClosed = this.isClosed.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(
      this
    );
    this.state = {
      isOpen: false,
      password: "",
      email: "",
      redirect: false,
      failedMsg: ""
    };
  }

  componentWillMount = () => {
    document.addEventListener("click", this.handleClick, false);
  };
  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClick, false);
  };

  handleClick = ev => {
    const open = this.state.isOpen;
    if (
      ReactDOM.findDOMNode(this.refs.modal) != null &&
      !ReactDOM.findDOMNode(this.refs.modal).contains(ev.target) &&
      open
    ) {
      this.handleClose();
    }
  };
  handleClose = () => {
    this.setState({ password: "", email: "", failedMsg: "" });
    this.props.handleCloseLoginForm(false);
  };
  isOpen = () => {
    this.setState({ isOpen: true });
  };
  isClosed = () => {
    this.setState({ isOpen: false });
  };
  getPasswordValidationState = () => {
    const length = this.state.password.length;
    if (length > 12) return "success";
    else if (length > 0) return "error";
    return null;
  };

  getEmailValidationState = () => {
    const email = this.state.email;

    if (
      email.length > 0 &&
      !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    )
      return "error";
    else if (
      email.length > 0 &&
      email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    )
      return "success";
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const email = this.state.email.trim().toLocaleLowerCase();
    const password = this.state.password.trim();
    const request =
      "http://localhost:8080/LogIn/login?email=" +
      email +
      "&password=" +
      password;
    if (
      this.getPasswordValidationState() === "success" &&
      this.getEmailValidationState() === "success"
    ) {
      axios.get(request).then(Response => this.handleResponse(Response));
    }
  };

  handleResponse = response => {
    const msg = response.data.message;
    if (msg === "sucessful") {
      this.setState({ failedMsg: "" });
      this.setState({ redirect: true });
    } else {
      console.log(response.data.message);
      this.setState({ failedMsg: msg });
    }
  };
  render() {
    const show = this.props.showForm;
    const redct = this.state.redirect;
    if (redct) {
      return <Redirect to="/search" />;
    }
    return (
      <Modal
        show={show}
        container={this}
        onEntered={this.isOpen}
        onExited={this.isClosed}
        onEscapeKeyDown={this.handleClose}
      >
        <Form horizontal onSubmit={this.handleSubmitForm}>
          <div ref={"modal"} style={modalStyle()}>
            <Modal.Header>
              <Modal.Title>{"Sign in to your account"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup
                controlId="formEmail"
                validationState={this.getEmailValidationState()}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={6}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    required={true}
                    onChange={this.handleEmailChange}
                    autoComplete="email"
                  />
                </Col>
              </FormGroup>
              <FormGroup
                controlId="formPassword"
                validationState={this.getPasswordValidationState()}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={6}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    required={true}
                    autoComplete="password"
                  />
                  <FormControl.Feedback />
                  <HelpBlock />
                  <h5>
                    <ControlLabel id="failedLogIn" style={failedMsgStyle()}>
                      {this.state.failedMsg}
                    </ControlLabel>
                  </h5>
                </Col>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose} bsStyle="default">
                Close
              </Button>
              <Button type="submit" bsStyle="primary">
                Sign In
              </Button>
            </Modal.Footer>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Login;
