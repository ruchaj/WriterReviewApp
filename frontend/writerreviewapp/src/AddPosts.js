import React, { useState, useEffect } from 'react';
import db from './Firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
const AddPost = ({ post }) => {
  const [formData, setFormData] = useState({
    anonymous: true,
    genre_id: '',
    title: '',
    user_id: '',
    content: '', 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setFormData({ ...post });
    }
  }, [post]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const postsCollection = collection(db, 'posts');

      if (post) {
        const postDoc = doc(postsCollection, post.id);
        await updateDoc(postDoc, {
          ...formData,
          post_date: serverTimestamp(),
        });
        console.log('Post updated successfully!');
      } else {
        await addDoc(postsCollection, {
          ...formData,
          post_date: serverTimestamp(),
        });
        console.log('Post added successfully!');
      }

      setFormData({
        anonymous: true,
        genre_id: '',
        title: '',
        user_id: '',
        content: '',
      });

      navigate('/');
    } catch (error) {
      console.error('Error adding/updating post:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">{post ? 'Update Post' : 'Add a New Post'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="anonymous" className="form-label">
            Anonymous:
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
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
              value={formData.genre_id}
              onChange={(e) => setFormData({ ...formData, genre_id: e.target.value })}
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
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
            <ReactQuill
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'color': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'color',
                'list', 'bullet', 'link', 'image'
              ]}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {post ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
