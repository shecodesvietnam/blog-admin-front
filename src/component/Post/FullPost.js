import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import BlogServices from "../../services/BlogServices";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { apiUrl } from "../../config/endpoint.json";
import WraperTest from "../layout/withlayout";

export default function FullPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const router = useHistory();

  useEffect(() => {
    BlogServices.get(id)
      .then((res) => setBlog(res.data))
      .catch((err) => window.location.replace("/404"));
  }, []);
  return (
    <WraperTest>
      <Grid container>
        <Grid
          item
          style={{
            marginTop: 16,
            marginBottom: 32,
            width: "97%",
            paddingBottom: 16,
            borderBottom: "1px solid white",
          }}
        >
          <Button
            variant="outlined"
            startIcon="<-"
            style={{
              color: "white",
              border: "1px solid white",
              padding: "0px 24px",
            }}
            onClick={() => router.push("/posts")}
          >
            <Typography>Back</Typography>
          </Button>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Carousel>
            {blog &&
              blog.images.map((image, index) => (
                <div key={index}>
                  <img src={`${apiUrl}/media/image/${image}`} alt={image} />
                </div>
              ))}
          </Carousel>
        </Grid>
        <Grid container direction="column" justify="center">
          <Grid item>
            <Typography variant="h1" color="primary">
              {blog && blog.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{blog && blog.content}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </WraperTest>
  );
}
