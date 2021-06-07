import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { apiUrl } from "../../config/endpoint.json";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 380,
    background: "black",
    borderImageSource:
      "linear-gradient(to left, rgb(232, 8, 114), rgb(89, 35, 104))",
    border: "1px solid",
    borderImageSlice: 1,
    padding: 16,
  },
});

export default function PostCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: 200, width: 200, margin: "auto" }}
          image={
            `${apiUrl}/media/image/${props.images[0]}` ||
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          }
        />
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.title.slice(0, 20) || "Please Wait"}
          </Typography>
          <Typography variant="body2" component="p">
            {props.content.slice(0, 50) || "Loading"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => props.more()} size="small" color="primary">
          More
        </Button>
        <Button onClick={() => props.edit()} size="small" color="primary">
          Edit
        </Button>
        <Button onClick={() => props.delete()} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
