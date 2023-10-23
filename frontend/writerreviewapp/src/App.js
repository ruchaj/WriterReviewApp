import { useState, useEffect } from 'react';
import './App.css';
import db from './Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import AddPosts from './AddPosts';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useUserContext } from './UserContext';
import Posts from './Posts';
import AddReview from './AddReview';
import AddAuthor from './AddAuthor';
import Login from './Login';
import Chatbot from './Chatbot';

function App() {
  const { user} = useUserContext();
  return (
    <Router>
      <div className="App">
        <h1>Writer Review</h1>
        <h4>Where you can share your excerpts and leave reviews anonymously!</h4>
        <NavLink to="/add" style={{ marginRight: '20px' }}>Add Post</NavLink>
        <NavLink to="/login" style={{ marginRight: '20px' }}>
          {user ? 'Logout' : 'Login'}
        </NavLink>
        <NavLink to="/chatbot">Get help from our Chatbot!</NavLink>
        <Routes>
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/add" element={<AddPosts />} />
          <Route path="/review/:postId" element={<AddReview />} />
          <Route path="/signup" element={<AddAuthor />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
