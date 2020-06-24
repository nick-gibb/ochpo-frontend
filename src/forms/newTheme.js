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
          Create a new report grouping by entering a suitable title and description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          onChange={onChange}
          name="title"
          error={props.errors.title}
          id="title"
          helperText="Required"
          inputProps={{
            maxLength: 50,
          }}
          required
          label="Title"
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Short description"
          inputProps={{
            maxLength: 75,
          }}
          required
          multiline
          error={props.errors.description}
          helperText="Required"
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
