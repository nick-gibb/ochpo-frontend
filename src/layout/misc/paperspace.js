import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
}));

export default function PaperSpace(props) {
  const classes = useStyles();

  return (
    <Container >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{props.children}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}