import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    fontSize: 12,
  },
  cardStyle: {
    margin: 10,
    // height: "100%"
  },
});

export default function CardHomeItem(props) {
  const classes = useStyles();
  let updateMsg;
  if(props.cardInfo.last_post != null){
      updateMsg = `Last update: ${new Date(props.cardInfo.last_post).toDateString()}`
  } else {
      updateMsg = "No updates"
  }
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={classes.cardStyle}>
        <CardActionArea component={Link} to={{
            pathname: "/theme/" + props.cardInfo.name_id,
            state: {'cardInfo':props.cardInfo}}
        }>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.cardInfo.title}
            </Typography>
            <Typography variant="body2" component="p">
              {props.cardInfo.description}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {updateMsg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
