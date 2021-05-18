import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@material-ui/core";
import BlogServices from "../../services/BlogServices";
import MediaServices from "../../services/MediaServices";
import axios from "axios";

export default function Edit() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    images: [""],
  });
  const [file, setFile] = useState([]);
  const [deletefile, setDeleteFile] = useState([]);

  // const handleFileChange = (e) => {
  //   console.log(e.target.files);
  //   // setFile([...file, e.target.files[i]]);
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     console.log(e.target.files[i]);
  //     setFile((prev) => [...prev, e.target.files]);
  //   }
  //   //   if (e.target.files[0].size / 1000000 < 1) {
  //   //     setFile((prev) => [...prev, ...e.target.files]);
  //   //   } else {
  //   //     alert("Upload file < 1Mb please");
  //   //   }
  //   // }
  //   e.target.value = null;
  // };

  const handleFileChange = (e) => {
    if (e.target.files[0].size / 1000000 < 1) {
      setFile([...file, e.target.files[0]]);
    } else {
      alert("Upload file < 1Mb please");
    }
    e.target.value = null;
  };

  const bloginit = () => {
    setDeleteFile([]);
    setFile([]);
    BlogServices.get(id).then((res) => {
      setBlog(res.data);
    });
  };
  useEffect(() => {
    bloginit();
  }, []);

  const reload = () => {
    window.location.reload();
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const deleteRequest = [];
    let fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append("file", file[i], file[i].name);
    }
    deletefile.map((e) => deleteRequest.push(MediaServices.deleteImg(e)));
    const UploadPromise = MediaServices.upload(fd);
    const DeletePromises = axios.all(deleteRequest);
    const NormPostUpdatePromise = BlogServices.update(id, {
      title: blog.title,
      content: blog.content,
      images: [...blog.images],
    });
    const WithImgUpdatePromise = (res) =>
      BlogServices.update(id, {
        title: blog.title,
        content: blog.content,
        images: [...blog.images, ...res.data.file.map((e) => e.filename)],
      });
    if (deletefile && deletefile.length && file && file.length) {
      DeletePromises.then(() => {
        return UploadPromise;
      })
        .then((res) => {
          if (!res.status == 200) {
            return NormPostUpdatePromise;
          }
          return WithImgUpdatePromise(res);
        })
        .then(() => {
          reload();
        });
    } else
      UploadPromise.then((res) => {
        if (!res.status == 200) {
          return NormPostUpdatePromise;
        }
        return WithImgUpdatePromise(res);
      }).then(() => {
        reload();
      });
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <button
        onClick={() => {
          console.log(blog);
          console.log(file);
        }}
      >
        Add a New Blog
      </button>

      <form>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={blog && blog.title}
          name="title"
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <label>Blog body:</label>
        <textarea
          required
          value={blog && blog.content}
          name="content"
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        ></textarea>
        <label>Add Image</label>
        <input
          multiple
          type="file"
          onChange={handleFileChange}
          accept=".png,.jpg,.mp4,jpeg"
        />
        {file &&
          file.map((image, index) => (
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
          handleupdate(e);
        }}
      >
        Update post
      </button>
      <button
        onClick={() => {
          bloginit();
        }}
      >
        Reset
      </button>
      <h2>Current Image</h2>
      <div>
        {blog &&
          blog.images.map((e, i) => (
            <div key={i}>
              <img
                width={100}
                height="auto"
                src={`http://localhost:3000/api/media/image/${e}`}
              />
              <button
                key={i}
                onClick={() => {
                  if (!deletefile.some((el) => e == el)) {
                    setBlog((prev) => ({
                      ...prev,
                      images: blog.images.filter((image) => image != e),
                    }));
                    setDeleteFile((prev) => [...prev, e]);
                  }
                }}
              >
                delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
