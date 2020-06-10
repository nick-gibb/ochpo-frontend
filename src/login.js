import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import NavBar from "./appbar";
import UnAuthNavBar from "./unauthNavBar";
import TitleHeader from "./titleHeader";
import { Route, Redirect, Link, withRouter } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticated ? (
    <NavBar>
      <Button
        color="inherit"
        edge="end"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </Button>
    </NavBar>
  ) : (
    <UnAuthNavBar>
      <Button color="inherit" edge="end" component={Link} to="/login">
        Sign In
      </Button>
    </UnAuthNavBar>
  )
);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      checkbox: true,
      redirectToReferrer: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(evt) {
    if (evt.target.name === "checkbox") {
      this.setState({ [evt.target.name]: evt.target.checked });
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  }

  login = () => {
    fakeAuth.authenticate(() => {
      fetch("http://localhost:1337/auth/local", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: this.state.username,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.jwt) {
            return;
          }
          console.log(this.state.checkbox);
          if (this.state.checkbox) {
            localStorage.setItem("token", result.jwt);
          }
          this.setState(() => ({
            redirectToReferrer: true,
          }));
        });
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    if (Boolean(localStorage.getItem("token"))) {
      return <Redirect to="/" />
    }
    return (
      <React.Fragment>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={1}
          direction="column"
          style={{ minHeight: "60vh" }}
        >
          <TitleHeader title="Welcome" />

          <form onSubmit={(e) => e.preventDefault()}>
            <Grid item>
              <TextField
                id="standard-required"
                label="Username"
                name="username"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={this.login}
              >
                Log in
              </Button>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleChange}
                    color="primary"
                    name="checkbox"
                    checked={this.state.checkbox}
                  />
                }
                label="Remember me"
              />
            </Grid>
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}
