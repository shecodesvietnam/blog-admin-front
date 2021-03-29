import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Post = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);

  async function init() {
    const { data } = await axios.get(
      `http://206.189.155.4:3000/api/posts/${props.match.params.id}`
    );

    setPost(data);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);


  return (
    <div>
      {!loading && (
        <>
          <Link
            to={{
              pathname: `/posts/${props.match.params.id}/edit`,
              state: {
                post,
              },
            }}
          >
            Edit
          </Link>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <p>{post.images}</p>
        </>
      )}
    </div>
  );
};

export default Post;
