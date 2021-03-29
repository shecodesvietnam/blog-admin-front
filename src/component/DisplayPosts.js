import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-router-dom';
import PostsPage from '../pages/PostsPage/PostsPage';

class App extends React.Component {
    state = {
      users: [],
      isLoading: true,
      errors: null
    };
  
    getPosts() {
      axios
        .get("http://206.189.155.4:3000/api/posts")
        .then(response =>
          response.data.results.map(post => ({
            id: `${post.id}`,
            title: `${post.title}`,
            content: `${post.content}`,
            image: `${post.images}`
          }))
        )
        .then(posts => {
          this.setState({
            posts,
            isLoading: false
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  
    componentDidMount() {
      this.getPosts();
    }
  
    render() {
      const { isLoading, posts } = this.state;
      return (
        <React.Fragment>
          <h2>All posts</h2>
          <div>
            {!isLoading ? (
              posts.map(post => {
                const { id, title, content, image } = post;
                return (
                  <div key={id}>
                    <p>{id}</p>
                    <div>
                      <img src={image} alt={title} />
                    </div>
                    <p>{content}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
  
  
  ReactDOM.render(<PostsPage />, document.getElementById("displayposts"));