import React, { useEffect, useState } from "react";

import PostCard from "../../component/Post/PostCard";
import { Grid, Button } from "@material-ui/core";

import BlogServices from "../../services/BlogServices";
import Auth from "../../utilities/handle_auth";
import MediaServices from "../../services/MediaServices";
import { AllInboxOutlined } from "@material-ui/icons";
import axios from "axios";

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
    let a = data.find((e) => id == e._id).images;
    let request = [];
    console.log(a);
    a.map((e) => request.push(MediaServices.deleteImg(e)));
    axios
      .all(request)
      .catch(console.err)
      .then((res) => {
        return BlogServices.remove(id)
          .catch((err) => console.log(err))
          .then((res) => {
            console.log(res);
          });
      });
  }

  return (
    <>
      <Button href="/posts/create">New post</Button>
      <Grid container justify="center" spacing={4} alignItems="center">
        {(data.length &&
          data.map((i, index) => (
            <Grid key={index} item>
              <PostCard
                title={i.title}
                images={i.images}
                content={i.content}
                more={() => {
                  window.location.replace(`/posts/${i._id}/`);
                }}
                edit={() => {
                  window.location.replace(`/posts/${i._id}/edit`);
                }}
                delete={() => {
                  deletePost(i._id);
                }}
              ></PostCard>
            </Grid>
          ))) ||
          "No posts yet"}
      </Grid>
    </>
  );
}
