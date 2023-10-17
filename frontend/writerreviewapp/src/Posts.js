import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "./Firebase";
import './Posts.css';
import { Link, NavLink } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState({});
  
    useEffect(() => {
      const postsCollection = collection(db, "posts");
      const reviewsCollection = collection(db, "reviews");
  
      const postsQuery = query(postsCollection);
      const reviewsQuery = query(reviewsCollection);
  
      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => {
          const postData = doc.data();
          return { ...postData, id: doc.id }; // Include the post ID
        });
        setPosts(newPosts);
      });
  
      const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
        const newReviews = {};
  
        snapshot.docs.forEach((doc) => {
          const reviewData = doc.data();
          const postTitle = reviewData.post_id; // Use the post title from the review
  
          if (!newReviews[postTitle]) {
            newReviews[postTitle] = [];
          }
          newReviews[postTitle].push(reviewData);
        });
        setReviews(newReviews);
      });
  
      return () => {
        unsubscribePosts();
        unsubscribeReviews();
      };
    }, []);
  
    const formatPostDate = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    };
  
    return (
      <div className="container card-container">
        {posts.map((post) => (
          <div className="card mb-4 custom-card" key={post.id}>
            <h5 className="genre">Genre: {post.genre_id}</h5>
            <small className="post-date">{formatPostDate(post.post_date)}</small>
            <div className="card-body">
              <h5 className="card-title fancy-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
            </div>
            <div className="card-footer">
              <h4>Reviews</h4>
              {reviews[post.title] && reviews[post.title].map((review, index) => (
                <div key={index} className="review">
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
            <NavLink to = {`/review`}>Add Review</NavLink>
          </div>
        ))}
      </div>
    );
  };
  
  export default Posts;