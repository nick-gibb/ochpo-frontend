import React from "react";
import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

export default function PostButtons(props) {
  const { onDelete, onCardClose } = props;
  return (
    <React.Fragment>
      <Tooltip title="Print">
        <IconButton aria-label="print" color="inherit">
          <PrintIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Download all attachments">
        <IconButton aria-label="download" color="inherit">
          <GetAppIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit post">
        <IconButton aria-label="edit" color="inherit">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete post">
        <IconButton onClick={onDelete} aria-label="delete" color="inherit">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Close">
        <IconButton onClick={onCardClose} aria-label="cancel" color="inherit">
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
