import React from "react";
import TitleHeader from "./titleHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Typography } from "@material-ui/core";
import FormNewPost from "./formNewPost";
import PostCard from "./postCard";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(5),
  },
}));

export default function CardStructure(props) {
  const classes = useStyles();
  const [title, setTitle] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [theForm, setTheForm] = React.useState({
    open: false,
    description: "",
    title: "",
  })
  let params = useParams();

  const [posts, setPosts] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:1337/themes?name_id=" + params.id)
      .then((res) => res.json())
      .then(
        (result) => {
            setTitle(result[0].title);
        let posts_unsorted = result[0].posts;
          posts_unsorted.sort(function (a, b) {
            var keyA = new Date(a.last_post),
              keyB = new Date(b.last_post);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });
          setIsLoaded(true);
          setPosts(posts_unsorted);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const { open } = theForm;

  const handleSubmit = (evt) => {
    setTheForm({ open: false });

    fetch("http://localhost:1337/posts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: theForm.title,
        description: theForm.description,
        name_id: theForm.title
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-_]/g, "")
          .toLowerCase(),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts((posts) => [...posts, result]);
      });
    evt.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let grid_cards;
  if (!posts.length) {
    grid_cards = <Typography variant="h6">No posts yet!</Typography>;
  } else {
    grid_cards = posts.map((post) => (
    <PostCard key={post.id} cardInfo={post} />
    ));
  }


    const specified_form = (
      <FormNewPost
        open={open}
        onClose={() => setTheForm({ open: false, title: "" })}
      />
    );
  

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return null;
  } else {
    return (
      <React.Fragment>
        <TitleHeader title={title} />
        <Grid container style={{ marginTop: 20 }}>
          {grid_cards}
        </Grid>
        {specified_form}
        <div className={classes.fab}>
          <Fab
            onClick={() => setTheForm({ open: true })}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}
