import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

const Delete = () => {
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

      const getBlog = (id) => {
        axios
          .get(`http://206.189.155.4:3000/api/posts/${id}`)
          .then((response) => {
            setCurrentBlog(response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
    const deleteBlog = (id) => {
        axios
          .del(`http://206.189.155.4:3000/api/posts/${id}`)
          .then((response) => {
            console.log(response.data);
            history.push("/posts");
          })
          .catch((e) => {
            console.log(e);
          });
      };
    return ( 
        <button
              type="submit"
              className="badge badge-success"
              onClick={() => deleteBlog(currentBlog.id)}
            >
              Delete
            </button>
     );
}
 
export default Delete;


