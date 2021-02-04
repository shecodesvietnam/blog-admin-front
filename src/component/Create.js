import { useState, useRef } from "react";
import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";
import useUndo from "use-undo";
import DeleteImage from "./DeleteImage";




const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const formRef = useRef();

  
  const history = useHistory();
  const [show, setShow] = useState(false);

  const [images, setImage] = useState([]);

  const handleFileChange = (e) => {
    setImage([...images, e.target.files[0]]);
    e.target.value = null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
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
    
    // const response = await axios.post(
    //   "http://206.189.155.4:3000/api/posts",
    //   blog,
    //   {
    //     headers: {
    //       "X-Auth-Token":
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
    //     },
    //   }
    // );
    

    // console.log(response.data.images[0]);
    // if (images) {
    //   const formData = new FormData();

    //   for (let i = 0; i < images.length; i++) {
    //     formData.append(
    //       "file",
    //       new File(
    //         [images[i]],
    //         response.data.images[i].replace("/media/", ""),
    //         { type: images[i].type }
    //       )
    //     );
    //   }

    //   await axios.post("http://206.189.155.4:3000/api/media", formData, {
    //     headers: {
    //       "X-Auth-Token":
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ",
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    // }
    // formRef.current.reset();
    // setTitle('')
    // setContent('')
    // setImage([])
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
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

        <label>Image</label>
        <input type="file" onChange={handleFileChange} accept='.png,.jpg,.mp4'  />
        {images.map((image, index) => <div key={ index}>
              <img src={URL.createObjectURL(image)} alt={`${image}`} />
              <DeleteImage onDelete={(e) => {
                e.preventDefault();
                const newImages = [...images];
                const index = newImages.indexOf(image);
               newImages.splice(index, 1);
                console.log(index);
                console.log(newImages)
                setImage(newImages);
              }} />
              </div>)}
       
        <button>Create</button>
        
        {/* <button>Discard</button> */}
      </form>
    </div>
  );
};

export default Create;