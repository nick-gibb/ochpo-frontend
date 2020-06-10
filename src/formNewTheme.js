import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export default function FormNewTheme(props) {
  const { onClose, open, handleSubmit, onChange } = props;

  return (
    <Dialog onClose={onClose} aria-labelledby="form-dialog-title" open={open}>
      <DialogTitle id="form-dialog-title">New Theme</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Reports are grouped into distinct themes. Create a new bucket by
          entering a suitable title and description below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          onChange={onChange}
          name="title"
          id="title"
          label="Title"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          label="Description"
          multiline
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Theme
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FormNewTheme.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
