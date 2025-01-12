//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import BookCard from './BookCard';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://library-management-system-3-ciao.onrender.com/api/books');
        setBooks(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Get the userId from the decoded token
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        await axios.post(
          'https://library-management-system-3-ciao.onrender.com/api/transaction/borrow',
          { bookId, userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert('Book borrowed successfully');
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, availableCopies: book.availableCopies - 1 } : book
          )
        );
      }
    } catch (err) {
      console.error('Error borrowing book:', err.message);
      alert('Error borrowing book');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Borrow a Book</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id}>
            <h5>{book.title}</h5>
            <p>Available Copies: {book.availableCopies}</p>
            <button
              onClick={() => handleBorrow(book._id)} // Trigger the borrow directly
              disabled={book.availableCopies <= 0}
            >
              Borrow
            </button>
          </div>
        ))
      ) : (
        <p>No books available for borrowing.</p>
      )}
    </div>
  );
};

export default BorrowBook;
