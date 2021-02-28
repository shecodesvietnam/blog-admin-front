import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

import DeleteImage from "./DeleteImage";
import Delete from "./Delete";

const Edit = (props) => {
  const { post, rawImages } = props.location.state;

  const [currentBlog, setCurrentBlog] = useState({
    id: post._id,
    title: post.title,
    content: post.content,
    images: [...post.images],
  });
  const [message, setMessage] = useState("");

  const formRef = useRef();
  const imageRef = useRef();

  const [uploadedImages, setUploadedImages] = useState(rawImages);

  const [newImages, setNewImages] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentBlog({
      ...currentBlog,
      images: [...currentBlog.images, e.target.files[0].name],
    });
    setNewImages([...newImages, e.target.files[0]]);
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(
        `http://206.189.155.4:3000/api/posts/${currentBlog.id}`,
        {
          title: currentBlog.title,
          content: currentBlog.content,
          images: [...currentBlog.images],
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Auth-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMessage("The blog was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBlog ? (
        <div className="edit-form">
          <h4>Edit a post</h4>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="title">Blog title:</label>
              {/* {currentBlog.map((title) => <>
              <img src={`http://206.189.155.4:3000${title}`} alt={`${title}`} />
              <DeleteButton onDelete={(e) => {
                e.preventDefault();
                const newTitle = [...currentBlog.title]
                const index = newTitle.indexOf(title);
                newTitle.splice(index, 1);
                // const newRawImages = [ ...rawImages ].splice(index, 1);
                setCurrentBlog({...currentBlog, title: newTitle});
                setImage(newTitle);
              }} />
            </>)} */}
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Blog body:</label>
              {/* {currentBlog.map((content) => <>
              <img src={`http://206.189.155.4:3000${content}`} alt={`${content}`} />
              <DeleteButton onDelete={(e) => {
                e.preventDefault();
                const newContent = [...currentBlog.content]
                const index = newContent.indexOf(content);
                newContent.splice(index, 1);
                // const newRawImages = [ ...rawImages ].splice(index, 1);
                setCurrentBlog({...currentBlog, content: newContent});
                setImage(newContent);
              }} />
            </>)} */}
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={currentBlog.content}
                onChange={handleInputChange}
              />
            </div>
            <label>Image</label>
            {uploadedImages.map((image, index) => 
              <div key={index}>
                <img src={`http://206.189.155.4:3000/media/${image.name}`}/>
                <DeleteImage
                onDelete={(e) => {
                  e.preventDefault();
                  const images = [...currentBlog.images];
                  images.splice(index, 1);
                  const newRawImages = [...uploadedImages].splice(index, 1);
                  console.log(newRawImages)
                  setCurrentBlog({ ...currentBlog, images: images });
                  setUploadedImages(newRawImages);
                }}/>
              </div>
            )}
            {newImages.map((image, index) => <div key={index}>
                  <img src={URL.createObjectURL(image)} alt={`${image.name}`} />
                  <DeleteImage
                    
                  />
                </div>
            )
            }
            <input
              type="file"
              onChange={handleFileChange}
              accept=".png,.jpg,.mp4"
            />

            <button
              type="submit"
              className="badge badge-success"
              // onClick={() => update(currentBlog.id)}
            >
              Update
            </button>
            {/* <Delete /> */}
            <p>{message}</p>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please publish a new post...</p>
        </div>
      )}
    </div>
  );
};

export default Edit;
