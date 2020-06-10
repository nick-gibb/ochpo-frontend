import React, { useState, useEffect } from "react";
import TitleHeader from "../layout/misc/titleHeader";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import FormNewPost from "../forms/newPost";
import PostCard from "../cards/post";
import { useParams } from "react-router-dom";
import MyFab from "../layout/misc/fab";


export default function CardStructure() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theForm, setTheForm] = useState({
    open: false,
    subject: "",
    body: "",
  });

  const [posts, setPosts] = useState({});

  let params = useParams();
  useEffect(() => {
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
    console.log(e);

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
        <FormNewPost
          open={open}
          onChange={handleChange}
          onClose={() => setTheForm({ open: false, title: "" })}
        />

        <MyFab
          onClick={() => setTheForm({ open: true })}
          toolTipMsg="Add Theme"
          color="primary"
          icon="AddIcon"
        />
      </React.Fragment>
    );
  }
}
