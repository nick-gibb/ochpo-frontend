import React, { useState } from "react";
// import TitleHeader from "../layout/misc/titleHeader";
import Grid from "@material-ui/core/Grid";
import FormNewTheme from "../forms/newTheme.js";
import ThemeCard from "../cards/theme";
import MyFab from "../layout/misc/fab";
import Container from "@material-ui/core/Container";

export default function ThemesPage(props) {
  const themes = props.items;
  const [theForm, setTheForm] = useState({
    open: props.open,
    description: "",
    title: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
  });

  const { open } = theForm;

  const onClose = () => {
    setTheForm({ ...theForm, open: false });
    setFormErrors({ title: false, description: false });
  };

  const handleSubmit = (evt) => {
    setFormErrors({
      description: !Boolean(theForm.description),
      title: !Boolean(theForm.title),
    });

    if (theForm.description === "" || theForm.title === "") {
      return;
    }

    setTheForm({ ...theForm, open: false });

    props.postTheme(theForm.title, theForm.description);

    evt.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  document.title = "Briefing Portal";

  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginTop: 20 }}>
        {themes.map((item) => (
          <ThemeCard key={item.name_id} cardInfo={item} />
        ))}
      </Grid>
      <FormNewTheme
        open={open}
        onClose={onClose}
        handleSubmit={handleSubmit}
        onChange={handleChange}
        errors={formErrors}
      />

      <MyFab
        onClick={() => setTheForm({ ...theForm, open: true })}
        color="primary"
        toolTipMsg="Add Theme"
        icon="AddIcon"
      />
    </Container>
  );
}

ThemesPage.defaultProps = {
  open: false,
};
