import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  const { onClose, open, onChange } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={open}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">New Report</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Enter a new update below.</DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          onChange={onChange}
          name="subject"
          label="Subject"
          fullWidth
        />

        <TextField
          autoFocus
          margin="dense"
          id="body"
          onChange={onChange}
          name="body"
          label="Body"
          fullWidth
        />

        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={emails}
          disableCloseOnSelect
          getOptionLabel={(option) => option.email}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.email}
            </React.Fragment>
          )}
          style={{ marginTop: 15 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Send email notifications"
            />
          )}
        />

        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            style={{ marginTop: 15 }}
          >
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

const emails = [
  { email: "susan.ternan@canada.ca" },
  { email: "nicholas.gibb@canada.ca" },
  { email: "sheriff.abdou@canada.ca" },
  { email: "kelsey.tonin@canada.ca" },
  { email: "teresa.tam@canada.ca" },
];
