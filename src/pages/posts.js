import React from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PaperSpace from "../layout/misc/paperspace";
import MyFab from "../layout/misc/fab";
import Button from "@material-ui/core/Button";

import AttachFileIcon from "@material-ui/icons/AttachFile";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(0.5),
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//     marginTop: theme.spacing(10),
//   },
// }));

class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {},
      authors: null,
    };
  }

  updatePage() {
    const post_id = this.props.match.params.id;

    fetch("http://localhost:1337/posts/" + post_id)
      .then((res) => res.json())
      .then(
        (result) => {
          const authorInfo = result.users;
          const authors = authorInfo.map(
            (item) => item.firstName + " " + item.lastName
          );
          this.setState({
            isLoaded: true,
            post: result,
            authors: authors,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    this.updatePage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.updatePage();
    }
  }

  render() {
    const { error, isLoaded, post, authors } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return null;
    } else {
      if (post.statusCode === 404) {
        return <Typography variant="h5">Post not found</Typography>;
      }
      const attachmentButtons = [];
      const attachments = post.attachments;
      attachments.forEach(function (attachment) {
        const { name, ext, url, id } = attachment;
        const filename = name + ext;

        attachmentButtons.push(
          <Button
            key={id}
            startIcon={<AttachFileIcon />}
            size="large"
            href={url}
            // variant="outlined"
            target="_blank"
            color="primary"
          >
            {filename}
          </Button>
        );
      });

      return (
        <React.Fragment>
          <PaperSpace>
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{authors.join(", ")}</Typography>
            <Typography>{post.publication_date}</Typography>
            <Typography>{attachmentButtons}</Typography>
            <Typography>{post.description}</Typography>
          </PaperSpace>
          <Box display="block" displayPrint="none">
            <MyFab color="secondary" toolTipMsg="Edit" icon="EditIcon" />
          </Box>
        </React.Fragment>
      );
    }
  }
}

export default PostTemplate;
