import React, { useState } from 'react';
import db from './Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AddReview = () => {
    const [anonymous, setAnonymous] = useState(true);
    const [content, setContent] = useState('');
    const [review_date, setReviewDate] = useState(new Date('October 17, 2023 12:32:14 GMT-0700'));
    const [user_id] = useState('bmaNahLNe2wuqxRln60C');
    const [post_id, setPostId] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const reviewsCollection = collection(db, 'reviews');
            await addDoc(reviewsCollection, {
                anonymous,
                content,
                post_id,
                review_date,
                user_id,
            });

            console.log('Review added successfully!');
        } catch (error) {
            console.error('Error adding review:', error);
        }

        setAnonymous(true);
        setContent('');
        setReviewDate(new Date('October 17, 2023 12:32:14 GMT-0700'));
        setPostId('');
        navigate('/');
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
                Review Name:
                <input type="text" value={post_id} onChange={(e) => setPostId(e.target.value)} />
            </label>
            <br />
            <label>
                Review Date:
                <input type="datetime-local" value={review_date.toISOString().slice(0, -8)} onChange={(e) => setReviewDate(new Date(e.target.value))} />
            </label>
            <br />
            <label>
                User ID:
                <input type="text" value={user_id} disabled />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddReview;
