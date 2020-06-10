import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

export default function UnAuthNavBar(props) {
  return (
    <Box display="block" displayPrint="none">
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" edge="end" to="/about" component={Link}>
              About
            </Button>
            <div style={{ flexGrow: 1 }}></div>
            <Button color="inherit" edge="end" to="/register" component={Link}>
              Register
            </Button>
            {props.children}
          </Toolbar>
        </AppBar>
      </div>
    </Box>
  );
}
