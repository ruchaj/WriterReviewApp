import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import db from "./Firebase";
import './Posts.css';
import { Link, NavLink } from "react-router-dom";
import AddPosts from "./AddPosts";
import PostContent from "./PostContent";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState({});
    const [updatePostData, setUpdatePostData] = useState(null);

    useEffect(() => {
        const postsCollection = collection(db, "posts");
        const reviewsCollection = collection(db, "reviews");

        const postsQuery = query(postsCollection);
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
    }, []);

    const formatPostDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    };

    const handleUpdatePost = (post) => {
        setUpdatePostData(post);
    };

    const handleDeletePost = async (postId) => {
        try {
            await deleteDoc(doc(db, "posts", postId));
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            console.log("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="container card-container">
            {updatePostData && <AddPosts updatePostData={updatePostData} />}
            {posts.map((post) => (
                <div className="card mb-4 custom-card" key={post.id}>
                    <h5 className="genre">Genre: {post.genre_id}</h5>
                    <small className="post-date">{formatPostDate(post.post_date)}</small>
                    <div className="card-body">
                        <h5 className="card-title fancy-title">{post.title}</h5>
                        <PostContent htmlContent={post.content} />
                    </div>
                    <div className="card-footer">
                        <h4>Reviews</h4>
                        {reviews[post.title] && reviews[post.title].map((review, index) => (
                            <div key={index} className="review">
                                <p className="review-content">{review.content}</p>
                            </div>
                        ))}
                        <button onClick={() => handleUpdatePost(post)}>Update Post</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                    </div>
                    <NavLink to={`/review/${post.id}`}>Add Review</NavLink>
                </div>
            ))}
        </div>
    );
};

export default Posts;
