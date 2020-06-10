import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import PaperSpace from "../layout/misc/paperspace";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(5),
  },
});

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
    const { classes } = this.props;

    const { error, isLoaded, post, authors } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return null;
    } else {
      if (post.statusCode === 404) {
        return <Typography variant="h5">Post not found</Typography>;
      }

      return (
        <React.Fragment>
          <PaperSpace>
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{authors.join(", ")}</Typography>
            <Typography>{post.publication_date}</Typography>
            <Typography>Attatchments: {post.attatchments.length}</Typography>
            <Typography>{post.description}</Typography>
          </PaperSpace>
          <Box display="block" displayPrint="none">
            <div className={classes.fab}>
              <Fab
                //   onClick={() => setTheForm({ open: true })}
                color="secondary"
                aria-label="edit"
              >
                <EditIcon />
              </Fab>
            </div>
          </Box>
        </React.Fragment>
      );
    }
  }
}

export default withStyles(styles)(PostTemplate);
