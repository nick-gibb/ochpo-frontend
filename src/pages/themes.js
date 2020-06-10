import React, { useState, useEffect } from "react";
import TitleHeader from "../layout/misc/titleHeader";
import Grid from "@material-ui/core/Grid";
import FormNewTheme from "../forms/newTheme.js";
import { Typography } from "@material-ui/core";
import ThemeCard from "../cards/theme";
import MyFab from "../layout/misc/fab";


export default function CardStructure() {

  const [theForm, setTheForm] = useState({
    open: false,
    description: "",
    title: "",
  });

  const [themes, setThemes] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
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

  const onClose = () => {
    setTheForm({ open: false });
  };

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
          onClose={onClose}
          handleSubmit={handleSubmit}
          onChange={handleChange}
        />

        <MyFab
          onClick={() => setTheForm({ open: true })}
          color="primary"
          toolTipMsg="Add Theme"
          icon="AddIcon"
        />
      </React.Fragment>
    );
  }
}
