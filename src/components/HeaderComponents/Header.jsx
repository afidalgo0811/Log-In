import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  toolbar: {
    backgroundColor: theme.palette.common.black
  },
  root: {
    flexGrow: 1
  },
  accountIcon: {
    flex: 1,
    textAlign: "right"
  },
  typography: {
    flex: 1,
    textAlign: "left"
  }
});

class Header extends React.Component {
  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = e => {
    document.getElementById("login").blur();
    this.props.handleOpenLoginForm(true);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" elevation={1} className={classes.toolbar}>
          <Toolbar>
            <div className={classes.typography}>
              <Typography
                variant="headline"
                color="inherit"
                noWrap
                align="left"
              >
                epiQ Data Product
              </Typography>
            </div>

            <div className={classes.accountIcon}>
              <IconButton
                variant="fab"
                color="inherit"
                aria-haspopup="true"
                onClick={this.handleOpen}
                id="login"
              >
                <AccountCircle />
                {this.props.signIn}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Header);
