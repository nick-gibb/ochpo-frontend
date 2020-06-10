import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function FormNewPost(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
      maxWidth='lg'
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">New Post</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Enter a new update below.</DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Subject"
          fullWidth
        />

        <MUIRichTextEditor
          label="Body text"
          controls={[
            "bold",
            "italic",
            "underline",
          ]}
        />

        <Box mt={8} />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Add attachments
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
