import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BlogServices from "../../services/BlogServices";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FullPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    BlogServices.get(id).then((res) => setBlog(res.data));
  }, []);
  return (
    <div>
      <Button onClick={() => window.location.replace("/posts")}>All</Button>
      <Button onClick={() => console.log(blog)}>Data</Button>
      <div>blog</div>
      <div>{blog && blog.title}</div>
      <div>Content</div>
      <div>{blog && blog.content}</div>
      <div>
        <Carousel>
          {blog &&
            blog.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:3000/api/media/image/${image}`}
                  alt={image}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
