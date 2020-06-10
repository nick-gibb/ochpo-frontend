import React from "react";
import TitleHeader from "../layout/misc/titleHeader";
import Grid from "@material-ui/core/Grid";
import FormNewTheme from "../forms/newTheme.js";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Typography } from "@material-ui/core";
import ThemeCard from "../cards/theme";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(5),
  },
}));

export default function CardStructure() {
  const classes = useStyles();

  const [theForm, setTheForm] = React.useState({
    open: false,
    description: "",
    title: "",
  });

  const [themes, setThemes] = React.useState({});
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    fetch("http://localhost:1337/themes")
      .then((res) => res.json())
      .then(
        (result) => {
          result.sort(function (a, b) {
            var keyA = new Date(a.last_post),
              keyB = new Date(b.last_post);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });
          setIsLoaded(true);
          setThemes(result);
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

    fetch("http://localhost:1337/themes", {
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
        setThemes((themes) => [...themes, result]);
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
  if (!themes.length) {
    grid_cards = <Typography variant="h6">No posts yet!</Typography>;
  } else {
      grid_cards = themes.map((item) => (
        <ThemeCard key={item.name_id} cardInfo={item} />
      ));
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return null;
  } else {
    return (
      <React.Fragment>
        <TitleHeader title="Briefing Portal" />
        <Grid container style={{ marginTop: 20 }}>
          {grid_cards}
        </Grid>
              <FormNewTheme
        open={open}
        onClose={() => setTheForm({ open: false })}
        handleSubmit={handleSubmit}
        onChange={handleChange}
      />
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
