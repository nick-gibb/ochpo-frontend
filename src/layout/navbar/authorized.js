import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LeftDrawer from "./leftDrawer";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <Box display="block" displayPrint="none">
      <AppBar position="static">
        {/* <AppBar position="static"  style={{ background: '#146094' }}> */}

        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/themes" color="inherit">
            Briefing Portal
          </Button>
          <Typography
            justify={"center"}
            className={classes.title}
            color="inherit"
          >
            {props.titleActivePage}
          </Typography>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          <Button color="inherit">API</Button>
          <Button component={Link} to="/profile" color="inherit">
            Profile
          </Button>
          <Button color="inherit">Sign out</Button>
        </Toolbar>
        <LeftDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          onClose={toggleDrawer}
          items={props.items}
        />
      </AppBar>
    </Box>
  );
}
