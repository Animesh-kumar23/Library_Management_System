import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import BookCard from './BookCard';

const ReturnBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await api.get('/transaction/borrowed', { params: { userId: 'USER_ID_HERE' } }); // Replace with actual userId
        setBorrowedBooks(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBorrowedBooks();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      await api.post('/transaction/return', { bookId });
      alert('Book returned successfully');
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error(err.message);
      alert('Error returning book');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Return a Book</h2>
      {borrowedBooks.length > 0 ? (
        borrowedBooks.map((book) => (
          <BookCard key={book._id} book={book} onReturn={handleReturn} />
        ))
      ) : (
        <p>No borrowed books to return.</p>
      )}
    </div>
  );
};

export default ReturnBook;
