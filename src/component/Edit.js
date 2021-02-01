import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

import DeleteImage from "./DeleteImage";

const Edit = (props) => {
  const { post, rawImages } = props.location.state;
  console.log(post)
  const initialBlogState = {
    id: null,
    title: "",
    content: "",
    images: null,
  };

  const [currentBlog, setCurrentBlog] = useState(post);
  const [message, setMessage] = useState("");

  const formRef = useRef();

  const history = useHistory();
  const [show, setShow] = useState(false);

  const [images, setImage] = useState(rawImages);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
    
  };

  const handleFileChange = (e) => {
    setImage(e.target.files);
    const fileNames = [...currentBlog.images];
    for (let i = 0; i < e.target.files.length; i++){
      fileNames.push(e.target.files[i].name)
    }
    setCurrentBlog({...currentBlog, images: fileNames});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    
    if (images) {
      for (let i = 0; i < images.length; i++) {
        rawImages.push(images[i].name);
      }
      console.log(post);
    }

    const response = await axios.post(
      "http://206.189.155.4:3000/api/posts",
      post,
      {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
        },
      }
      
    );
   

    const update = (id) => {  axios.put(
      `http://206.189.155.4:3000/api/posts/${id}`,
      post,
      {
        headers: {
          'Accept':'application/json',
        'Content-Type':'application/json',
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessage("The blog was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      })
      
    
    };


    console.log(response.data.images[0]);
    if (images) {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append(
          "file",
          new File(
            [images[i]],
            response.data.images[i].replace("/media/", ""),
            { type: images[i].type }
          )
        );
      }

      await axios.post("http://206.189.155.4:3000/api/media", formData, {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
          "Content-Type": "multipart/form-data",
        },
      });
    }
    
  };



  return (
    <div>
      {currentBlog ? (
        <div className="edit-form">
          <h4>Edit a post</h4>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="title">Blog title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={post.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Blog body:</label>
              <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                value={post.content}
                onChange={handleInputChange}
              />
            </div>
            <label>Image</label>
            
            {currentBlog.images.map((image) => <>
              <img src={`http://206.189.155.4:3000${image}`} alt={`${image}`} />
              <DeleteImage onDelete={(e) => {
                e.preventDefault();
                const newImages = [...currentBlog.images]
                const index = newImages.indexOf(image);
                newImages.splice(index, 1);
                const newRawImages = [ ...rawImages ].splice(index, 1);
                setCurrentBlog({...currentBlog, images: newImages});
                setImage(newRawImages);
              }} />
            </>)}
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
