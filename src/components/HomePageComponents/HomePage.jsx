import React from "react";
import HomeContent from "../ContentComponents/HomeContent";
import Header from "../HeaderComponents/Header";
import LogIn from "../LogInComponents/LogIn";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseLoginForm = this.handleCloseLoginForm.bind(this);
    this.handleOpenLoginForm = this.handleOpenLoginForm.bind(this);
  }
  state = {
    showLogInForm: false,
    signIn: "Sign In"
  };

  handleCloseLoginForm = show => {
    this.setState({ showLogInForm: show });
  };
  handleOpenLoginForm = show => {
    this.setState({ showLogInForm: show });
  };
  render() {
    return (
      <div>
        <Header
          handleOpenLoginForm={this.handleOpenLoginForm}
          signIn={this.state.signIn}
        />
        <HomeContent />
        <LogIn
          showForm={this.state.showLogInForm}
          handleCloseLoginForm={this.handleCloseLoginForm}
        />
      </div>
    );
  }
}

export default HomePage;
