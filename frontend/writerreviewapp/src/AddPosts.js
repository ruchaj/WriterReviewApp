import React, { useState, Redirect  } from 'react';
import db from './Firebase';
import { useNavigate } from 'react-router-dom';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import Posts from './Posts';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPostForm = () => {
  const [post, setPost] = useState({
    anonymous: true,
    content: '',
    genre_id: '',
    title: '',
    user_id: '',
    writing_form_id: '',
    post_date: new Date(), 
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPost({
      ...post,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const postsCollection = collection(db, "posts");
  
      await addDoc(postsCollection, {
        ...post,
        post_date: serverTimestamp(),
      });
      console.log('Post added successfully!');
      
      setPost({
        anonymous: true,
        content: '',
        genre_id: '',
        title: '',
        user_id: '',
        writing_form_id: '',
      });
        navigate('/');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  
  
  return (
    <div className="container">
      <h2 className="mt-4">Add a New Post</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="anonymous" className="form-label">
            Anonymous:
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={post.anonymous}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
            <input
              type="text"
              id="content"
              name="content"
              className="form-control"
              value={post.content}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="genre_id" className="form-label">
            Genre ID:
            <input
              type="text"
              id="genre_id"
              name="genre_id"
              className="form-control"
              value={post.genre_id}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={post.title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">
            User ID:
            <input
              type="text"
              id="user_id"
              name="user_id"
              className="form-control"
              value={post.user_id}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="writing_form_id" className="form-label">
            Writing Form ID:
            <input
              type="text"
              id="writing_form_id"
              name="writing_form_id"
              className="form-control"
              value={post.writing_form_id}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default AddPostForm;
