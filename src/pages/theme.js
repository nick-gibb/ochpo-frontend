import React, { useState, useEffect } from "react";
import PostSmall from "../layout/post-small";
import PostLarge from "../layout/post-large";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import FormNewPost from "../forms/newPost";
import axios from "axios";
import ListItem from "../cards/list";
import Divider from "@material-ui/core/Divider";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
// import ReactToPrint from "react-to-print";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TitleHeader from "../layout/misc/titleHeader";
import DeleteDialog from "../layout/alert";

const API_ENDPOINT = "http://localhost:1337";

export default function Theme() {
  const theme = useTheme();
  const theme_name = useParams().id;
  const post_id = useParams().postid;
  const largePage = useMediaQuery(theme.breakpoints.up("md"));
  let match = useRouteMatch();

  const [posts, setPosts] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchArea, setSearchArea] = useState("title");

  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [themeId, setThemeId] = useState("");

  const [found, setFound] = useState(true);

  const [cardOpen, setCardOpen] = useState(false);

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [themeMetaLoaded, setThemeMetaLoaded] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  function onDelete() {
    setDeleteDialogOpen(true);
  }

  function onCardClose() {
    history.push(`/themes/${theme_name}`);
  }

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        `${API_ENDPOINT}/posts?themes.name_id=${theme_name}&${searchArea}_contains=${searchQuery}`
      );
      if (!ignore) setFilteredPosts(result.data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [searchQuery, searchArea, theme_name]);

  useEffect(() => {
    async function fetchThemeInfo() {
      const response = await fetch(
        `${API_ENDPOINT}/themes?name_id=${theme_name}`
      );
      const res = await response.json();
      if (res.length === 0) {
        setFound(false);
        document.title = "Not found";
      } else {
        setThemeMetaLoaded(true);
        setFound(true);
        setTitle(res[0].title);
        console.log(`Title set to ${res[0].title}`);
        setThemeId(res[0].id);
        document.title = res[0].title;
        if (post_id) {
          setCardOpen(true);
        }
      }
    }
    fetchThemeInfo();
    return () => {
      //   document.title = "Briefing Portal";
    };
  }, [theme_name]);

  useEffect(() => {
    setSearchQuery("");

    async function fetchMyAPI() {
      const response = await fetch(
        `${API_ENDPOINT}/posts?themes.name_id=${theme_name}&_sort=updated_at:DESC`
      );
      const res = await response.json();
      setPostsLoaded(true);
      setPosts(res);
      console.log("Set posts");
    }
    fetchMyAPI();
  }, [theme_name]);

  const handleSubmit = (returnedPost) => {
    setPosts((posts) => [...posts, returnedPost]);
  };

  const handleDelete = (deletedPost) => {
    history.push(`/themes/${theme_name}`);

    let filtered = posts.filter((post) => post.id !== deletedPost.id);
    setPosts(filtered);
  };

  const handleRadioChange = (e) => {
    setSearchArea(e.target.value);
  };

  const history = useHistory();

  const onCardClick = (cardInfo) => (e) => {
    setCardOpen(true);
    // fetchPost(cardInfo.id);
    const name_id = cardInfo.themes[0].name_id;
    history.push(`/themes/${name_id}/${cardInfo.id}`);
  };

  if (!postsLoaded || !themeMetaLoaded) {
    // document.title = "Loading...";
    return null;
  } else {
    let grid_cards;
    let message;

    if (searchQuery !== "") {
      if (filteredPosts.length) {
        message = <Typography variant="h6">Query results</Typography>;
        grid_cards = filteredPosts.map((post) => (
          // <PostCard key={post.id} onCardClick={onCardClick} cardInfo={post} />
          <ListItem key={post.id} onCardClick={onCardClick} cardInfo={post} />
        ));
      } else {
        message = <Typography variant="h6">Query not found.</Typography>;
      }
    } else {
      if (!found) {
        message = (
          <Box display="flex" mb={1}>
            <Typography display="inline" style={{ flex: 1 }} variant="h6">
              Theme not found
            </Typography>
          </Box>
        );
      } else {
        if (!posts.length) {
          message = (
            <Box display="flex" mb={1}>
              <Typography display="inline" style={{ flex: 1 }} variant="h6">
                No updates yet
              </Typography>

              <Button
                onClick={() => setFormOpen(true)}
                startIcon={<AddCircleOutlineIcon />}
                color="primary"
                display="inline"
                variant="outlined"
              >
                Add New
              </Button>
            </Box>
          );
        } else {
          message = (
            <React.Fragment>
              <Box display="flex" mb={1}>
                <Typography display="inline" style={{ flex: 1 }} variant="h6">
                  Most recent updates
                </Typography>

                <Button
                  onClick={() => setFormOpen(true)}
                  startIcon={<AddCircleOutlineIcon />}
                  color="primary"
                  display="inline"
                  variant="outlined"
                >
                  Add New
                </Button>
              </Box>
              <Divider />
            </React.Fragment>
          );

          grid_cards = posts.map((post) => (
            <ListItem key={post.id} onCardClick={onCardClick} cardInfo={post} />
          ));
        }
      }
    }
    return (
      <Container maxWidth="xl" display="block">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={3}
          style={{ marginTop: 20 }}
        >
          {/* SIDEBAR */}
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TitleHeader title={title} />
            <Box p={1}>
              {posts.length ? (
                <Box p={1}>
                  <TextField
                    fullWidth
                    id="standard-search"
                    label="Search..."
                    size="small"
                    type="search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // onChange={onSearch}
                  />
                  <Box ml={2} mt={2} mb={2}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Search by</FormLabel>
                      <RadioGroup
                        hidden
                        size="small"
                        row
                        value={searchArea}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="title"
                          control={<Radio color="primary" />}
                          label="Title"
                        />
                        <FormControlLabel
                          value="description"
                          control={<Radio color="primary" />}
                          label="Description"
                        />
                        <FormControlLabel
                          value="author"
                          control={<Radio color="primary" />}
                          label="Author"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              ) : (
                ""
              )}
              {message}
              {grid_cards}
            </Box>
          </Grid>
          {/* POST CONTENT */}
          <Grid item md={6} lg={8} xl={6}>
            {post_id &&
              (largePage ? (
                <PostLarge
                  onDelete={onDelete}
                  onCardClose={onCardClose}
                  themeTabTitle={title}
                  postId={match.params.postid}
                />
              ) : (
                <PostSmall
                  onDelete={onDelete}
                  onCardClose={onCardClose}
                  themeTabTitle={title}
                  postId={match.params.postid}
                  open={cardOpen}
                />
              ))}
          </Grid>
        </Grid>
        <DeleteDialog
          open={deleteDialogOpen}
          handleClose={handleDeleteDialogClose}
          postId={match.params.postid}
          handleDelete={handleDelete}
        />
        <FormNewPost
          open={formOpen}
          themeId={themeId}
          //   onChange={handleChange}
          onClose={() => setFormOpen(false)}
          handleSubmit={handleSubmit}
          //   subjectValue={subjectValue}
        />
      </Container>
    );
  }
}
