import React, { useState } from 'react';
import api from '../../api/api';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    availabilityStatus: true, // Set the default availability status
    totalCopies: '', // Add totalCopies to the state
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the POST request with the correct body structure
      await api.post(
        '/books',
        {
          title: formData.title,
          author: formData.author,
          genre: formData.genre,
          publicationYear: formData.publicationYear,
          availabilityStatus: formData.availabilityStatus,
          totalCopies: formData.totalCopies, // Add totalCopies to the request body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authorization
          },
        }
      );
      alert('Book added successfully');
    } catch (err) {
      console.error(err.message);
      alert('Error adding book');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Publication Year</label>
          <input
            type="number"
            name="publicationYear"
            className="form-control"
            value={formData.publicationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Availability Status</label>
          <select
            name="availabilityStatus"
            className="form-control"
            value={formData.availabilityStatus}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <div className="form-group">
          <label>Total Copies</label>
          <input
            type="number"
            name="totalCopies"
            className="form-control"
            value={formData.totalCopies}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
