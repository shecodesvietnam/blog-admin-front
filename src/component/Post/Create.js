import { useState } from "react";

import MediaServices from "../../services/MediaServices";
import BlogServices from "../../services/BlogServices";
import { Button, Grid, Input, TextField, Typography } from "@material-ui/core";
import WraperTest from "../layout/withlayout";
import { useHistory } from "react-router";
import { Carousel } from "react-responsive-carousel";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
  const router = useHistory();

  const handleFileChange = (e) => {
    if (e.target.files[0].size / 1000000 < 1) {
      setFile([...file, e.target.files[0]]);
    } else {
      alert("Upload file < 1Mb please");
    }
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append("file", file[i], file[i].name);
    }

    MediaServices.upload(fd)
      .catch((err) => console.log(err))
      .then((res) => {
        return BlogServices.create({
          title: title,
          content: content,
          images: res.data.file.map((e) => e.filename),
        });
      })
      .catch((e) => console.log(e))
      .then((res) => {
        setTitle("");
        setContent("");
        setFile([]);
      });
  };

  return (
    <WraperTest>
      <Grid
        container
        style={{
          marginTop: 16,
          marginBottom: 32,
          width: "90%",
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
          onClick={() => router.goBack()}
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
            <Typography align="left">Add a New Blog</Typography>
          </Grid>
          <Grid>
            <form>
              <Grid>
                <Typography>Blog title:</Typography>
              </Grid>
              <TextField
                variant="filled"
                style={{ width: "100%" }}
                inputProps={{ style: { color: "white" } }}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Grid>
                <Typography>Blog body:</Typography>
              </Grid>
              <TextField
                variant="filled"
                style={{ width: "100%" }}
                inputProps={{ style: { color: "white" } }}
                required
                multiline
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></TextField>
              <Grid>
                <Typography>Image</Typography>
              </Grid>
              <Button variant="text" component="label">
                <Typography>Chọn ảnh từ máy tính </Typography>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              <Grid container>
                {file.map((image, index) => (
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
                      <Typography>Delete Image</Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </form>
            <Grid container>
              <Button
                variant="outlined"
                style={{ border: "1px solid white" }}
                onClick={(e) => {
                  handleSubmit(e).then(() => router.push("/posts"));
                }}
                disabled={
                  !(
                    content.length != 0 &&
                    file.length != 0 &&
                    title.length != 0
                  )
                }
              >
                <Typography>Create post</Typography>
              </Button>
            </Grid>
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
          </Carousel>
          <Typography variant="h2" style={{ color: "white" }}>
            <b>{title}</b>
          </Typography>
          <Typography style={{ color: "white" }} variant="h6" gutterBottom>
            {content}
          </Typography>
        </Grid>
      </Grid>
    </WraperTest>
  );
};

export default Create;
