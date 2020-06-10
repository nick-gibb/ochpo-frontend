import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(5),
  },
}));

export default function MyFab(props) {
  const classes = useStyles();
  let icon;
  if(props.icon === 'AddIcon') {
      icon = <AddIcon />
  } else {
      icon = <EditIcon />
  }

  return (
    <div className={classes.fab}>
      <Tooltip title={props.toolTipMsg} aria-label="add">
        <Fab
          onClick={props.onClick}
          color={props.color}
          aria-label="add"
        >
          {icon}
        </Fab>
      </Tooltip>
    </div>
  );
}
