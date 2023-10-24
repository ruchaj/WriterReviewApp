import React, { useState } from 'react';
import db from './Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './UserContext';
const AddReview = () => {
    const { postId } = useParams();
    console.log(postId);
    const [anonymous, setAnonymous] = useState(true);
    const [content, setContent] = useState('');
    const [review_date, setReviewDate] = useState(new Date().toISOString().slice(0, -8));
    const { user } = useUserContext(); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const reviewsCollection = collection(db, 'reviews');
            await addDoc(reviewsCollection, {
                anonymous,
                content,
                post_id: postId, 
                review_date: new Date(review_date),
                user_id: user ? user.email : '',
            });

            console.log('Review added successfully!');
        } catch (error) {
            console.error('Error adding review:', error);
        }

        setAnonymous(true);
        setContent('');
        setReviewDate(new Date().toISOString().slice(0, -8));
        navigate('/posts');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Anonymous:
                <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
            </label>
            <br />
            <label>
                Content:
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <br />
            <label>
                Review Date:
                <input type="datetime-local" value={review_date} onChange={(e) => setReviewDate(e.target.value)} />
            </label>
            <br />
            <label>
                User ID:
                <input type="text" value={user ? user.email : ''} disabled /> 
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddReview;
