import React, { useState } from 'react';
import db from './Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddAuthor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const authorsCollection = collection(db, 'authors');

            await addDoc(authorsCollection, {
                email,
                password,
                username,
                timesWarned: 0,
                numberOfPosts: 0,
            });

            console.log('Author added successfully!');
        } catch (error) {
            console.error('Error adding author:', error);
        }

        setEmail('');
        setPassword('');
        setUsername('');
    };

    return (
        <div>
            <h2>Add a New Author</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddAuthor;
