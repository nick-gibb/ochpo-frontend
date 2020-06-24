import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import { Link } from "react-router-dom";
import "./styles/post.css";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardArea: {
    "&:hover": {
      outline: "#3f51b5",
      outlineStyle: "auto",
    },
    cursor: "pointer",
  },
  cardArea2: {
    background: "#528cc470",
  },
  title: {
    fontSize: 12,
  },
}));

export default function ListItem(props) {
  const classes = useStyles();
  let buttons = [];
  let buttonsFormatted;
  if (props.cardInfo.attachments.length) {
    props.cardInfo.attachments.forEach(function (attachment) {
      const { name, ext, url } = attachment;
      const filename = (
        <Typography
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: 200,
          }}
          variant="subtitle2"
        >
          {name + ext}
        </Typography>
      );
      buttons.push(
        <Button
          key={attachment.id}
          // size="large"
          startIcon={<AttachFileIcon />}
          size="small"
          href={"http://localhost:1337" + url}
          target="_blank"
          color="primary"
          // variant="outlined"
        >
          {filename}
        </Button>
      );
    });

    buttonsFormatted = (
      <Box overflow="auto" component="div" textOverflow="ellipsis">
        {buttons}
      </Box>
    );
  }

  const authorInfo = props.cardInfo.users;
  const authors = authorInfo.map(
    (item) => item.firstName + " " + item.lastName
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const publication_date = new Date(
    props.cardInfo.created_at
  ).toLocaleDateString("en-US", options);
  return (
    <Grid item>
      <div
        onClick={props.onCardClick(props.cardInfo)}
        className={classes.cardArea}
      >
        <Box px={1}>
          <Typography
            //   component={Link}
            noWrap
            //   to={"/posts/" + props.cardInfo.id}
            variant="subtitle1"
          >
            {props.cardInfo.title}
          </Typography>
          <Typography
            className={classes.pos}
            variant="subtitle2"
            noWrap
            color="textSecondary"
          >
            {authors.join(", ")}
          </Typography>
          <Typography
            className={classes.pos}
            variant="subtitle2"
            noWrap
            color="textSecondary"
          >
            {publication_date}
          </Typography>
          {buttonsFormatted}
        </Box>
      </div>
      <Divider />
    </Grid>
  );
}
