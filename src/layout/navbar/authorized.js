import React, { useState, useEffect } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import LeftDrawer from "./leftDrawer";


export default function NavBar(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  useEffect(() => {
    fetch("http://localhost:1337/themes")
      .then((res) => res.json())
      .then(
        (result) => {
          result.sort(function (a, b) {
            var keyA = new Date(a.last_post),
              keyB = new Date(b.last_post);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return null;
  } else {
    return (
      <Box display="block" displayPrint="none">
        <div>
          <AppBar position="static">
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
                Home
              </Button>

              <div style={{ flexGrow: 1 }}></div>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
              <Button color="inherit" edge="end" to="/about" component={Link}>
                About
              </Button>
              {props.children}
            </Toolbar>
            <LeftDrawer
              open={open}
              toggleDrawer={toggleDrawer}
              onClose={toggleDrawer}
              items={items}
              error={error}
              isLoaded={isLoaded}
            />
          </AppBar>
        </div>
      </Box>
    );
  }
}
