import { useState, useRef, useEffect } from "react";

import MediaServices from "../../services/MediaServices";
import BlogServices from "../../services/BlogServices";
import randomkey from "../../utilities/randomkey";
import { Button } from "@material-ui/core";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
  const [allimg, setAllImage] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    MediaServices.getAll()
      .catch((e) => console.log(e))
      .then((res) => {
        if (res) {
          setAllImage(res.data);
        }
      });
  }, [allimg]);

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
        console.log(res.data);
        setTitle("");
        setContent("");
        setFile([]);
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form ref={formRef}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label>Image</label>
        <input
          multiple
          type="file"
          onChange={handleFileChange}
          accept=".png,.jpg,.mp4,jpeg"
        />
        {file.map((image, index) => (
          <div key={index}>
            <img
              width={100}
              height="auto"
              src={URL.createObjectURL(image)}
              alt={`${image}`}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                const newImages = [...file];
                const index = newImages.indexOf(image);
                newImages.splice(index, 1);
                setFile(newImages);
              }}
            >
              Delete Image
            </Button>
          </div>
        ))}
      </form>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Create post
      </button>
      <div>
        {allimg &&
          allimg.map((e, i) => (
            <div key={randomkey()}>
              <img
                width={100}
                height="auto"
                src={`http://localhost:3000/api/media/image/${e.filename}`}
              />
              <button
                key={i}
                onClick={() =>
                  MediaServices.deleteImg(e.filename).then((res) => {
                    console.log(res);
                  })
                }
              >
                delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Create;
