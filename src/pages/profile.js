import React, { useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import PaperSpace from "../layout/misc/paperspace";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function Profile() {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <PaperSpace>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">Posts</Typography>

      <List>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Title" secondary="Date" />

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </PaperSpace>
  );
}
