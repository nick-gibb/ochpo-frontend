import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const lala = props.item.posts;
    const r = lala.map((res) =>
        console.log(res.created_at)
    );
console.log("")
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.item.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.item.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Last updated 00/00/00
        </Typography>
      </CardContent>
    </Card>
  );
}
