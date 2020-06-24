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
    margin: 3,
    // height: "100%"
  },
});

export default function CardHomeItem(props) {
  const classes = useStyles();
  let updateMsg;
  if (props.cardInfo.last_post != null) {
    updateMsg = `Last update: ${new Date(
      props.cardInfo.last_post
    ).toDateString()}`;
  } else {
    updateMsg = "No updates";
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.cardStyle} variant="outlined">
        <CardActionArea
          component={Link}
          to={{
            pathname: "/themes/" + props.cardInfo.name_id,
          }}
        >
          <CardContent>
              <Typography variant="h6" noWrap component="h6">
                {props.cardInfo.title}
              </Typography>
            <Typography variant="body2" noWrap component="p">
              {props.cardInfo.description}
            </Typography>
            <Typography className={classes.pos} noWrap color="textSecondary">
              {updateMsg}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
