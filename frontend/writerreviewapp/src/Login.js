import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from './Firebase';
const auth = getAuth();


const Login = () => {
  const { setUser } = useUserContext();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser(user);
      navigate('/posts');
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setError('An error occurred while logging in with Google');
    }
  };
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();

    const authorsCollection = collection(db, 'authors');
    const q = query(authorsCollection, where('username', '==', username), where('password', '==', password));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const user = querySnapshot.docs[0].data();
        setUser(user);
        navigate('/posts');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error checking login credentials:', error);
      setError('An error occurred while checking your credentials');
    }
  };


  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="btn btn-primary">
        Login with Google
      </button>
      {error && <p className="text-danger">{error}</p>}
      <p>
        New user? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
