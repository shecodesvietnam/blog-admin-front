import React, { useEffect, useState } from "react";

import PostCard from "../../component/Post";
import { Button, Grid } from "@material-ui/core";

import BlogServices from "../../services/BlogServices";
import Auth from "../../utilities/handle_auth";

export default function PostsPage() {
  const [data, setData] = useState("");

  useEffect(() => {
    Auth();
    BlogServices.getAll()
      .catch((err) => {
        console.log(err);
      })
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function deletePost(id) {
    BlogServices.remove(id)
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }
  return (
    <Grid container justify="center" spacing={4} alignItems="center">
      {data &&
        data.map((i, index) => (
          <Grid key={index} item>
            <PostCard
              title={i.title}
              images={i.images}
              content={i.content}
              delete={() => {
                deletePost(i._id);
              }}
            ></PostCard>
          </Grid>
        ))}
    </Grid>
  );
}
