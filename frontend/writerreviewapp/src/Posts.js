import React, { useState, useEffect } from "react";
import { collection, where, getDocs, onSnapshot, updateDoc, query, deleteDoc, doc, increment  } from "firebase/firestore";
import db from "./Firebase";
import './Posts.css';
import { useUserContext } from "./UserContext";
import { Link, NavLink } from "react-router-dom";
import AddPosts from "./AddPosts";
import PostContent from "./PostContent";

const Posts = () => {
    const containerStyles = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px',
        margin: '0 auto',
        maxWidth: '800px',
        padding: '24px',
      };
      
      const cardStyles = {
        flex: '1 0 calc(35% - 20px)',
        padding: '20px',
        border: '1px solid #c9c9c9',
        borderRadius: '7px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
      };      
      const genreStyles = {
        margin: '0',
        color: '#007489',
      };
      
      const cardTitleStyles = {
        margin: '0',
        fontSize: '1.2rem',
        color: '#222',
      };
      
      const postContentStyles = {
        marginTop: '10px',
        fontSize: '0.9rem',
        color: '#757575',
        display: 'none', 
      };
      
      const readMoreButtonStyles = {
        backgroundColor: '#007489',
        color: '#fff',
        border: 'none',
        padding: '0.3rem 0.8rem',
        marginTop: '10px',
        cursor: 'pointer',
      };
      
      const reviewStyles = {
        margin: '10px 0',
        border: '1px solid #c9c9c9',
        padding: '10px',
        borderRadius: '5px',
      };
      
      const reviewContentStyles = {
        fontSize: '0.9rem',
      };
      
      const addReviewLinkStyles = {
        display: 'block',
        margin: '10px 0',
        color: '#007489',
        textDecoration: 'none',
      };
      
      
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState({});
    const [updatePostData, setUpdatePostData] = useState(null);
    const { user } = useUserContext();
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const handleReportReview = async (review) => {
      try {
        const postID = review.post_id;
    
        const querySnapshot = await getDocs(query(collection(db, "reviews"), where("post_id", "==", postID)));
    
        if (!querySnapshot.empty) {
          const reviewDoc = querySnapshot.docs[0];
    
          await deleteDoc(reviewDoc.ref);
    
          console.log("Review reported and deleted successfully!");
        } else {
          console.log("No matching review document found.");
        }
      } catch (error) {
        console.error("Error reporting or deleting the review:", error);
      }
    };
    const handleReportPost = async (post) => {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        console.log("Post reported and deleted successfully!");
      } catch (error) {
        console.error("Error reporting the post:", error);
      }
    };
        
    useEffect(() => {
        const postsCollection = collection(db, "posts");
        const reviewsCollection = collection(db, "reviews");
        const fetchGenres = async () => {
          const genresCollection = collection(db, 'genres');
          const genresSnapshot = await getDocs(genresCollection);
          const genreData = genresSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGenres(genreData);
        };
        fetchGenres();
    
        let postsQuery = query(postsCollection);

        if (selectedGenre) {
          postsQuery = query(postsCollection, where('genre_id', '==', selectedGenre));
        }
              const reviewsQuery = query(reviewsCollection);

        const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
            const newPosts = snapshot.docs.map((doc) => {
                const postData = doc.data();
                return { ...postData, id: doc.id }; 
            });
            setPosts(newPosts);
        });
      
        const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
            const newReviews = {};

            snapshot.docs.forEach((doc) => {
                const reviewData = doc.data();
                const postTitle = reviewData.post_id; 

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
    }, [selectedGenre]);

    const formatPostDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString();
    };

    const handleUpdatePost = (post) => {
      const isUserAuthorized = user && (user.email === post.user_id || user.uid === post.user_id || user.email === "ruchajoshi2000@gmail.com");

      if (isUserAuthorized) {
        setUpdatePostData(post);
      }
    };

    const handleDeletePost = async (postId) => {
      const post = posts.find((p) => p.id === postId);

      const isUserAuthorized = user && (user.email === post.user_id || user.uid === post.user_id || user.email === "ruchajoshi2000@gmail.com");
    
      if (isUserAuthorized) {
        try {
          await deleteDoc(doc(db, "posts", postId));
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
          console.log("Post deleted successfully!");
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      } else {
        console.error("User is not authorized to delete this post.");
      }
    };
    
    const toggleReadMore = (postId) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                return { ...post, isReadMore: !post.isReadMore };
            }
            return post;
        }));
    };

    return (
      <div style={containerStyles} className="container card-container">
        <h2>Filter by Genre</h2>
        <select
            onChange={(e) => setSelectedGenre(e.target.value)}
            value={selectedGenre || ''}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              margin: '0.5rem 0',
              fontFamily: 'inherit',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
            }}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.genre_name}>
                {genre.genre_name}
              </option>
            ))}
      </select>
        {updatePostData && <AddPosts post={updatePostData} />}

        {posts.map((post) => (
          <div style={cardStyles} className={`card mb-4 custom-card ${post.isReadMore ? 'expanded' : ''}`} key={post.id}>
            <div className="scroll">
              <div style={genreStyles}>Genre: {post.genre_id}</div>
              <small className="post-date">{formatPostDate(post.post_date)}</small>
              <div className="card-body">
                <h5 style={cardTitleStyles} className="card-title fancy-title">
                  {post.title}
                </h5>
                <PostContent htmlContent={post.content} maxLength={250} />
              </div>
              <button onClick={() => handleReportPost(post)}>Report Post</button>
              <div className="card-footer">
                <h4>Reviews</h4>
                {reviews[post.id] &&
                  reviews[post.id].map((review, index) => (
                    <div style={reviewStyles} key={index} className="review">
                      <p style={reviewContentStyles} className="review-content">
                        {review.content}
                      </p>
                      <button onClick={() => handleReportReview(review)}>Report Review</button>
                    </div>
                  ))}
                {user && (user.email === post.user_id || user.uid === post.user_id || user.email === "ruchajoshi2000@gmail.com") && (
                  <>
                    <button onClick={() => handleUpdatePost(post)}>Update Post</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                  </>
                )}
              </div>
              <NavLink to={`/review/${post.id}`} style={addReviewLinkStyles} className="add-review-link">
                Add Review
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    );
  };
export default Posts;
