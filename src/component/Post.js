import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PostCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={
            `http://localhost:3000/api/media/image/${props.images[0]}` ||
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title || "Please Wait"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content || "Loading"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button onClick={() => props.delete()} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
