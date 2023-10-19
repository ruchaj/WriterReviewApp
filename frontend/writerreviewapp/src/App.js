import { useState, useEffect } from 'react';
import './App.css';
import db from './Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import AddPosts from './AddPosts';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Posts from './Posts';
import AddReview from './AddReview';
import AddAuthor from './AddAuthor';
import Login from './Login';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Writer Review</h1>
        <h4>Where you can share your excerpts and leave reviews anonymously!</h4>
        <NavLink to="/add">Add Post</NavLink>
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/add" element={<AddPosts />} />
          <Route path="/review/:postId" element={<AddReview />} />
          <Route path="/signup" element={<AddAuthor />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
