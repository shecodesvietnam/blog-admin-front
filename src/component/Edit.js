import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const initialBlogState = {
    id: null,
    title: "",
    content: "",
    images: null,
  };

  const [currentBlog, setCurrentBlog] = useState(initialBlogState);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef();

  const history = useHistory();
  const [show, setShow] = useState(false);

  const [images, setImage] = useState(null);

  // const getBlog = (id) => {
  //   BlogServices.get(id)
  //     .then((response) => {
  //       setCurrentBlog(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const getBlog = (id) => {
    axios
      .get("http://206.189.155.4:3000/api/posts/:id")
      .then((response) => {
        setCurrentBlog(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   getBlog(props.match.params.id);
  // }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const blog = {
      title,
      content,

      images: [],
    };
    if (images) {
      for (let i = 0; i < images.length; i++) {
        blog.images.push(images[i].name);
      }
      console.log(blog);
    }

    const updateBlog = (e) => {
      axios
        .put("http://206.189.155.4:3000/api/posts/:id", currentBlog)

        .then((response) => {
          console.log(response.data);
          setMessage("The blog was updated successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const deleteBlog = (e) => {
      axios
        .del("http://206.189.155.4:3000/api/posts/:id")
        .then((response) => {
          console.log(response.data);
          history.push("/posts");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    // fetch("http://localhost:8000/blogs/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   // X-Auth-Token: {add jwt token here},
    //   body: JSON.stringify(blog),
    // }).then(() => {
    //   // history.go(-1);
    //   history.push("/");
    // });

    // axios.put('http://dummy.restapiexample.com/api/v1/update/{this.state.id}', blog)
    // .then(res => console.log(res.data));
    const response = await axios.post(
      "http://206.189.155.4:3000/api/posts",
      blog,
      {
        headers: {
          "X-Auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
        },
      }
    );
    // .then(() => {
    //   // history.go(-1);
    //   history.push("/");
    // });

    const update = axios.put("http://206.189.155.4:3000/api/posts/:id", blog, {
      headers: {
        "X-Auth-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
      },
    });

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
    formRef.current.reset();
    setTitle("");
    setContent("");
    setImage([]);
  };

  //   return (
  //     <div className="edit">
  //       <h2>Edit a post</h2>
  //       <form onSubmit={handleSubmit} ref={formRef}>
  //         <label>Blog title:</label>
  //         <input
  //           type="text"
  //           required
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}

  //         />
  //         <label>Blog body:</label>
  //         <textarea
  //           required
  //           value={content}
  //           onChange={(e) => setContent(e.target.value)}
  //         ></textarea>

  //         <label>Image</label>
  //         <input type="file" multiple onChange={handleFileChange} accept='.png,.jpg,.mp4' />

  //         <button className="badge badge-danger mr-2" onClick={(e) => {
  //                 deleteBlog(e);
  //               }}>
  //             Delete
  //           </button>

  //           <button
  //             type="submit"
  //             className="badge badge-success"
  //             onClick={updateBlog}
  //           >
  //             Update
  //           </button>
  //       </form>
  //       <p>{message}</p>
  //     </div>
  //   );
  // };

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
                value={currentBlog.title}
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
                value={currentBlog.content}
                onChange={handleInputChange}
              />
            </div>
            <label>Image</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".png,.jpg,.mp4"
            />
            <button
              className="badge badge-danger mr-2"
              onClick={() => this.deleteBlog()}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={() => this.updateBlog()}
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
