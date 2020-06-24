import React, { useState, useCallback } from "react";
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
// import MyEditor from "../forms/richTextEditor/draft";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CancelIcon from "@material-ui/icons/Cancel";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AttachFileIcon from "@material-ui/icons/AttachFile";
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
  const { onClose, open, handleSubmit, themeId } = props;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const fetchRequest = useCallback(() => {
    console.log(selectedDate);
    fetch("http://localhost:1337/posts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: body,
        title: subject,
        themes: [{ id: themeId }],
        users: [{ id: 1 }],
        publication_date: selectedDate,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        handleSubmit(result);
      });
  }, [body, subject]);

  const handleSubmit2 = () => {
    fetchRequest();
    onClose();
  };

  const cancelForm = () => {
    setSubject("");
    setBody("");
    onClose();
  };

  return (
    <Dialog
      onClose={cancelForm}
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
          variant="outlined"
          id="name"
          //   value={subjectValue}
          //   onChange={handleSubjectChange}
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          name="subject"
          label="Subject"
          fullWidth
          style={{ marginBottom: 15 }}
        />

        <TextField
          margin="dense"
          variant="outlined"
          id="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          //   onChange={handleBodyChange}
          name="body"
          label="Body"
          fullWidth
          style={{ marginBottom: 15 }}
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
              variant="outlined"
              label="Email notifications (optional)"
            />
          )}
        />
        <div style={{ width: "100%" }}>
          <Box display="flex" justifyContent="flex-start">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Report date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box display="flex" justifyContent="flex-start">
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
                startIcon={<AttachFileIcon />}
                style={{ marginTop: 15 }}
              >
                Add attachments
              </Button>
            </label>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={cancelForm}
          variant="outlined"
          startIcon={<CancelIcon />}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          // onClick={handleSubmit(subjectValue, bodyValue)}
          onClick={handleSubmit2}
          variant="outlined"
          color="primary"
          startIcon={<PostAddIcon />}
        >
          Submit Report
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
