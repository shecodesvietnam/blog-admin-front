import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import DeleteImage from "./DeleteImage";
import MediaServices from "../services/MediaServices";
import BlogServices from "../services/BlogServices";

const Create = () => {
  const [isUpload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
  const [allimg, setAllImage] = useState([]);
  const formRef = useRef();

  const history = useHistory();
  const [show, setShow] = useState(false);

  const [images, setImage] = useState([]);

  useEffect(() => {
    MediaServices.getAll()
      .catch((e) => console.log(e))
      .then((res) => setAllImage(res.data));
  }, [allimg]);

  const handleFileChange = (e) => {
    setFile([...file, e.target.files[0]]);
    e.target.value = null;
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    let blog = {
      title,
      content,
      images,
    };
    if (blog.title && blog.content && blog.images) {
      BlogServices.create(blog)
        .catch((e) => console.log(e))
        .then((res) => console.log(res.data));
    }
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
        res.data.file.map((e) => setImage((prev) => [...prev, e.filename]));
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form>
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

        {/* <button type="submit">Discard</button> */}
      </form>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>Image</label>
        <input
          multiple
          type="file"
          onChange={handleFileChange}
          accept=".png,.jpg,.mp4"
        />
        {file.map((image, index) => (
          <div key={index}>
            <img
              width={100}
              height="auto"
              src={URL.createObjectURL(image)}
              alt={`${image}`}
            />
            <DeleteImage
              onDelete={(e) => {
                e.preventDefault();
                const newImages = [...file];
                const index = newImages.indexOf(image);
                newImages.splice(index, 1);
                setImage(newImages);
                setFile(newImages);
              }}
            />
          </div>
        ))}
        <button type="submit">upload</button>
      </form>
      <button
        onClick={() => {
          console.log(images);
        }}
      >
        log
      </button>
      <button
        onClick={(e) => {
          handleCreatePost(e);
        }}
      >
        Create post
      </button>
      <div>
        {allimg &&
          allimg.map((e, i) => (
            <>
              <img
                key={Math.random() * 1000 + e.filename}
                width={100}
                height="auto"
                src={`http://localhost:3000/api/media/image/${e.filename}`}
              />
              <button
                key={Math.random() * 1000 + e.filename}
                onClick={() =>
                  MediaServices.deleteImg(e.filename).then((res) => {
                    console.log(res);
                  })
                }
              >
                delete
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default Create;
