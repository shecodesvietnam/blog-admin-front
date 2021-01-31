import React, { useEffect, useState } from "react";
import axios from "axios";

import Edit from "./Edit";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    images: [],
  });
  const [rawImages, setRawImages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function init() {
    const { data } = await axios.get(
      `http://206.189.155.4:3000/api/posts/${props.match.params.id}`
    );

    const images = [...data.images];
    const raws = [];

    for (let i = 0; i < (images.length > 0 ? images.length : 0); i++) {
      const { data } = await axios.get(`http://206.189.155.4:3000${images[i]}`);
      raws.push(new File([data], images[i].replace("/media/", "")));
    }

    setRawImages(raws);
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
                rawImages,
              },
            }}
          >
            Edit
          </Link>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
};

export default Post;
