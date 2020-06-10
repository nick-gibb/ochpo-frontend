import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TitleHeader from "./titleHeader";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={2}
          direction="column"
          style={{ minHeight: "60vh" }}
        >
          <TitleHeader title="Register" />

          {/* <form onSubmit={(e) => e.preventDefault()}> */}

          <Grid item>
            <TextField id="first-name" label="First name" name="first-name" />
          </Grid>
          <Grid item>
            <TextField id="last-name" label="Last name" name="last-name" />
          </Grid>
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
              id="email"
              label="Email"
              name="email"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              label="Password"
              type="password"
              name="password"
              // onChange={this.handleChange}
            />
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              // onClick={this.login}
            >
              Register
            </Button>
          </Grid>


          {/* </form> */}
        </Grid>
      </React.Fragment>
    );
  }
}
