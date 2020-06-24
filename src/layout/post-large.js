import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import MarkdownView from "react-showdown";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PostButtons from "../cards/postButtons";

export default function PostSmall(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { postId, themeTabTitle, onDelete, onCardClose } = props;
  console.log(props);
  const [shownCard, setShownCard] = React.useState({});

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch("http://localhost:1337/posts/" + postId);
      const res = await response.json();
      setIsLoaded(true);

      setShownCard(res);
      document.title = res.title;
    }
    fetchPost();
    return () => {
      document.title = themeTabTitle;
    };
  }, [postId]);

  if (!isLoaded) {
    return null;
  } else {
    console.log(shownCard);
    return (
      <React.Fragment>
        <Paper elevation={5} style={{ maxHeight: "80vh", overflow: "auto" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            py={4}
            px={3}
            className="postText"
          >
            <Box flexGrow={1}>
              <Typography
                display="inline"
                style={{ flex: "250px" }}
                variant="h6"
              >
                {shownCard.title}
              </Typography>
            </Box>
            <Box>
              <PostButtons onDelete={onDelete} onCardClose={onCardClose} />
            </Box>
            <Box display="block" width="100%">
              {shownCard.users &&
                shownCard.users.map((user, index) => {
                  const commaSep = index == 0 ? "" : ", ";
                  return (
                    <Typography display="inline" key={user.id}>
                      {commaSep}
                      {user.firstName} {user.lastName}
                    </Typography>
                  );
                })}
            </Box>
            <Box display="block" width="100%">
              {shownCard.attachments && (
                <Typography display="inline">Attachments: </Typography>
              )}
              {Array.isArray(shownCard.attachments) &&
              shownCard.attachments.length
                ? shownCard.attachments.map((attachment) => (
                    <Button
                      display="inline"
                      key={attachment.id}
                      color="primary"
                    >
                      {attachment.name + attachment.ext}
                    </Button>
                  ))
                : "None"}
            </Box>
            <MarkdownView
              markdown={shownCard.description}
              options={{ tables: true, emoji: true }}
            />{" "}
          </Box>
        </Paper>
      </React.Fragment>
    );
  }
}
