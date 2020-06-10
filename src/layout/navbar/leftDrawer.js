import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";

export default function LeftDrawer(props) {
  const { error, isLoaded, items } = props;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return null;
  } else {
    return (
      <SwipeableDrawer
        open={props.open}
        onClose={props.toggleDrawer}
        onOpen={props.toggleDrawer}
      >
        <div
          role="presentation"
          onClick={props.toggleDrawer}
          onKeyDown={props.toggleDrawer}
        >
          <List>
            <ListItem
              divider
              key="sectionHead"
            >
              <ListItemText
                primary={"Reporting Areas"}
                style={{ fontWeight: "bold" }}
              />
            </ListItem>
            {items.map((item) => (
              <ListItem
                button
                key={item.title}
                component={Link}
                to={{
                  pathname: "/theme/" + item.name_id,
                  state: { name: item.title },
                }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    );
  }
}
