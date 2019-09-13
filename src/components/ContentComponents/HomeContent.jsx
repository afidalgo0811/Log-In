import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const homeCSS = () => {
  return {
    textAlign: "center",
    marginTop: "20%"
  };
};
class HomeContent extends React.Component {
  state = {};
  render() {
    return (
      <div className="Container" style={homeCSS()}>
        <div>
          <h3>Welcome to epiQ Data Product Home Page</h3>
        </div>
        <div>
          <p>Please Log in to have access to the search feature.</p>
        </div>
      </div>
    );
  }
}

export default HomeContent;
