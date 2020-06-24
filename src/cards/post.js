import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import "./styles/post.css";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 12,
  },
  cardStyle: {},
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(0),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function PostCard(props) {
  const classes = useStyles();

  let buttons = [];
  let buttonsFormatted;
  if (props.cardInfo.attachments.length) {
    props.cardInfo.attachments.forEach(function (attachment) {
      const { name, ext, url } = attachment;
      const filename = name + ext;
      buttons.push(
        <Button
          key={attachment.id}
          // size="large"
          startIcon={<AttachFileIcon />}
          size="small"
          href={"http://localhost:1337" + url}
          target="_blank"
          color="default"
          // variant="outlined"
        >
          {filename}
        </Button>
      );
    });

    buttonsFormatted = (
      <CardActions>
        <Box overflow="auto" component="div" textOverflow="ellipsis">
          {buttons}
        </Box>
      </CardActions>
    );
  }

  const authorInfo = props.cardInfo.users;
  const authors = authorInfo.map(
    (item) => item.firstName + " " + item.lastName
  );
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const publication_date = new Date(
    props.cardInfo.created_at
  ).toLocaleDateString("en-US", options);

  //   const text = props.cardInfo.description;

  //   const newText = text.split("\n").map((item, i) => {
  //     return (
  //       <Typography style={{ marginTop: 10 }} key={i}>
  //         {item}
  //       </Typography>
  //     );
  //   });
  const history = useHistory()

  const cardClick = (cardInfo) => {
      const name_id = cardInfo.themes[0].name_id
      history.push(`/themes/${name_id}/${cardInfo.id}`);
  };

  return (
    <Grid item>
      <Card className={classes.cardStyle} variant="outlined">
        <CardActionArea onClick={props.onCardClick(props.cardInfo)}>
        {/* <CardActionArea onClick={() => cardClick(props.cardInfo)}> */}
          <CardContent>
            <Typography
              component={Link}
              noWrap
              to={"/posts/" + props.cardInfo.id}
              variant="h6"
            >
              {props.cardInfo.title}
            </Typography>
            <Typography className={classes.pos} noWrap color="textSecondary">
              {authors.join(", ")}
            </Typography>
            <Typography className={classes.pos} noWrap color="textSecondary">
              {publication_date}
            </Typography>
          </CardContent>
        </CardActionArea>
        {buttonsFormatted}
      </Card>
    </Grid>
  );
}
