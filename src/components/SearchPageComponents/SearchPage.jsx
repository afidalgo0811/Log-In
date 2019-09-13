import React from "react";
import Header from "../HeaderComponents/Header";
import Search from "./SearchContent";
import { Redirect } from "react-router-dom";

const mainTitleStyle = () => {
  return {
    textAlign: "center",
    marginTop: "5%",
    fontSize: "5em",
    fontWeight: "900"
  };
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: " Sign Out",
      redirect: false
    };
    this.handleLogoutRequest = this.handleLogoutRequest.bind(this);
  }

  handleLogoutRequest = () => {
    console.log("logging out");
    this.setState({ redirect: true });
  };
  render() {
    const redct = this.state.redirect;
    if (redct) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Header
          signIn={this.state.signIn}
          handleOpenLoginForm={this.handleLogoutRequest}
        />
        <h1 style={mainTitleStyle()}>epiQ</h1>
        <Search />
      </div>
    );
  }
}

export default SearchPage;
