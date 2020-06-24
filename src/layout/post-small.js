import React, { useEffect } from "react";
import PostButtons from "../cards/postButtons";

import { Typography } from "@material-ui/core";
import MarkdownView from "react-showdown";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function PostSmall(props) {
  const classes = useStyles();

  const [shownCard, setShownCard] = React.useState({});

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        "http://localhost:1337/posts/" + props.postId
      );
      const res = await response.json();
      setShownCard(res);
      document.title = res.title;
    }
    fetchPost();
    return () => {
      document.title = props.themeTabTitle;
    };
  }, [props.postId]);

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <section className={classes.rightToolbar}>
            <PostButtons
              onDelete={props.onDelete}
              onCardClose={props.onCardClose}
            />
          </section>
        </Toolbar>
      </AppBar>

      <Box className="postText">
        <Box m={3}>
          <Typography variant="h6">{shownCard.title}</Typography>
          <Box component="div" display="inline">
            <Typography display="inline">Attachments: </Typography>
            {shownCard.attachments &&
              shownCard.attachments.map((attachment) => (
                <Button display="inline" key={attachment.id} color="primary">
                  {attachment.name + attachment.ext}
                </Button>
              ))}
          </Box>
          <MarkdownView
            markdown={shownCard.description}
            options={{ tables: true, emoji: true }}
          />{" "}
        </Box>
      </Box>
    </Dialog>
  );
}
