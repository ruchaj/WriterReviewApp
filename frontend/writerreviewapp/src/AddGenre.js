import React, { useState, useEffect } from 'react';
import db from './Firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddGenre = () => {
  const [genreName, setGenreName] = useState('');
  const [genres, setGenres] = useState([]);
  const [reportedGenreName, setReportedGenreName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const genresCollection = collection(db, 'genres');
      await addDoc(genresCollection, {
        genre_name: genreName,
      });

      setGenreName('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  const handleReportGenre = async () => {
    try {
      const reportedGenre = genres.find((genre) => genre.genre_name === reportedGenreName);
      if (reportedGenre) {
        const genreDocRef = doc(db, 'genres', reportedGenre.id);
        await deleteDoc(genreDocRef);

        setReportedGenreName('');
        window.location.reload();
      } else {
        console.error('Genre not found to report:', reportedGenreName);
      }
    } catch (error) {
      console.error('Error reporting genre:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Add a New Genre</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="genreName" className="form-label">
            Genre Name:
            <input
              type="text"
              id="genreName"
              name="genreName"
              className="form-control"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h2 className="mt-4">Current Genres</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Genre Name</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.genre_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-4">Report and Delete a Genre</h2>
      <div className="mb-3">
        <label htmlFor="reportedGenreName" className="form-label">
          Improper Genre Name? Report it here:
          <input
            type="text"
            id="reportedGenreName"
            name="reportedGenreName"
            className="form-control"
            value={reportedGenreName}
            onChange={(e) => setReportedGenreName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleReportGenre} className="btn btn-danger">
        Report and Delete
      </button>
    </div>
  );
};

export default AddGenre;
