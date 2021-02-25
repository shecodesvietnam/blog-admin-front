import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

import Table from "./Table";


const Delete = (props) => {
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

  const [images, setImage] = useState(rawImages);
    
      const history = useHistory();
   

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentBlog({ ...currentBlog, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setCurrentBlog({
          ...currentBlog,
          images: [...currentBlog.images, e.target.files[0].name],
        });
        setImage([...images, e.target.files[0]]);
        e.target.value = null;
      };

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

    const  onDelete = (id) => {
        deleteBlog(id)
            .then((data) => {
                let blogPosts = currentBlog.filter((post) => {
                    return id !== post.id;
                });

                setCurrentBlog(blogPosts)
            })
            .catch((e) => {
              console.log(e);
            });
    };
    return ( 
      <Table>
        <button
              type="submit"
              className="badge badge-success"
              // onClick={() => deleteBlog(currentBlog.id)}
              onDelete={onDelete.bind(this)}
             
            >
              Delete
            </button>
            </Table>
     );
}
 
export default Delete;


