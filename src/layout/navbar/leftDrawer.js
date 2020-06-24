import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";

export default function LeftDrawer(props) {
  const { items } = props;

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
                  pathname: "/themes/" + item.name_id,
                //   state: { name: item.title },
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
