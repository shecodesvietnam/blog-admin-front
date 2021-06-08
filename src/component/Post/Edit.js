import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import BlogServices from "../../services/BlogServices";
import MediaServices from "../../services/MediaServices";
import axios from "axios";
import { apiUrl } from "../../config/endpoint.json";
import WraperTest from "../layout/withlayout";
import { Carousel } from "react-responsive-carousel";

export default function Edit() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    images: [""],
  });
  const [file, setFile] = useState([]);
  const [deletefile, setDeleteFile] = useState([]);
  const router = useHistory();

  const handleFileChange = (e) => {
    if (e.target.files[0].size / 1000000 < 1) {
      setFile([...file, e.target.files[0]]);
    } else {
      alert("Upload file < 1Mb please");
    }
    e.target.value = null;
  };

  const bloginit = () => {
    setDeleteFile([]);
    setFile([]);
    BlogServices.get(id)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => window.location.replace("/404"));
  };
  useEffect(() => {
    bloginit();
  }, []);

  const reload = () => {
    window.location.reload();
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const deleteRequest = [];
    let fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append("file", file[i], file[i].name);
    }
    deletefile.map((e) => deleteRequest.push(MediaServices.deleteImg(e)));
    const UploadPromise = MediaServices.upload(fd);
    const DeletePromises = axios.all(deleteRequest);
    const NormPostUpdatePromise = BlogServices.update(id, {
      title: blog.title,
      content: blog.content,
      images: [...blog.images],
    });
    const WithImgUpdatePromise = (res) =>
      BlogServices.update(id, {
        title: blog.title,
        content: blog.content,
        images: [...blog.images, ...res.data.file.map((e) => e.filename)],
      });
    if (deletefile && deletefile.length && file && file.length) {
      DeletePromises.then(() => {
        return UploadPromise;
      })
        .then((res) => {
          if (!res.status == 200) {
            return NormPostUpdatePromise;
          }
          return WithImgUpdatePromise(res);
        })
        .then(() => {
          reload();
        });
    } else
      UploadPromise.then((res) => {
        if (!res.status == 200) {
          return NormPostUpdatePromise;
        }
        return WithImgUpdatePromise(res);
      }).then(() => {
        reload();
      });
  };

  return (
    <WraperTest>
      <Grid
        container
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
      <Grid container direction="row" justify="space-evenly">
        <Grid
          item
          xs={4}
          style={{ paddingRight: 100, borderRight: "1px solid white" }}
        >
          <Grid>
            <Typography>Add a New Blog</Typography>
          </Grid>
          <Grid>
            <form>
              <Typography>Blog title</Typography>
              <TextField
                variant="filled"
                style={{ width: "100%" }}
                inputProps={{ style: { color: "white" } }}
                type="text"
                required
                value={blog && blog.title}
                name="title"
                onChange={(e) =>
                  setBlog((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <Typography>Blog body</Typography>
              <TextField
                variant="filled"
                style={{ width: "100%" }}
                inputProps={{ style: { color: "white" } }}
                required
                multiline
                rows={20}
                value={blog && blog.content}
                name="content"
                onChange={(e) =>
                  setBlog((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              ></TextField>
              <Typography>Blog image</Typography>
              <Grid container justify="center">
                <Button variant="text" component="label">
                  <Typography>Select Image </Typography>
                  <input
                    multiple
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".png,.jpg,.mp4,jpeg"
                  />
                </Button>
              </Grid>
              <Grid container>
                {file &&
                  file.map((image, index) => (
                    <Grid item xs={3} key={index}>
                      <Grid style={{ height: 100 }}>
                        <img
                          width={100}
                          height="auto"
                          src={URL.createObjectURL(image)}
                          alt={`${image}`}
                        />
                      </Grid>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          const newImages = [...file];
                          const index = newImages.indexOf(image);
                          newImages.splice(index, 1);
                          setFile(newImages);
                        }}
                      >
                        <Typography> Delete Image</Typography>
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </form>
          </Grid>
          <Grid container justify="space-around">
            <Button
              onClick={(e) => {
                handleupdate(e);
              }}
            >
              <Typography> Update post</Typography>
            </Button>
            <Button
              onClick={() => {
                bloginit();
              }}
            >
              <Typography>Reset</Typography>
            </Button>
          </Grid>
          <Typography>Current Image</Typography>
          <Grid container>
            {blog &&
              blog.images.map((e, i) => (
                <Grid item xs={3} key={i}>
                  <Grid style={{ height: 100 }}>
                    <img
                      width={100}
                      height="auto"
                      src={`${apiUrl}/media/image/${e}`}
                    />
                  </Grid>
                  <Button
                    key={i}
                    onClick={() => {
                      if (!deletefile.some((el) => e == el)) {
                        setBlog((prev) => ({
                          ...prev,
                          images: blog.images.filter((image) => image != e),
                        }));
                        setDeleteFile((prev) => [...prev, e]);
                      }
                    }}
                  >
                    <Typography>Delete</Typography>
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography>Preview</Typography>
          <Carousel>
            {file &&
              file.map((image, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(image)} alt={image} />
                </div>
              ))}
            {blog.images.map((image, index) => (
              <div key={index}>
                <img src={`${apiUrl}/media/image/${image}`} alt={image} />
              </div>
            ))}
          </Carousel>
          <Typography variant="h2" style={{ color: "white" }}>
            <b>{blog.title}</b>
          </Typography>
          <Grid container justify="center">
            <Typography style={{ color: "white" }} variant="h6" gutterBottom>
              {blog.content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </WraperTest>
  );
}
