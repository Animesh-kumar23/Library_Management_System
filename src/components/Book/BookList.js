import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import BookCard from './BookCard';
import { jwtDecode } from 'jwt-decode';
import AddBook from './AddBook'; // Import AddBook component
import './booklist.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false); // State to toggle delete mode
  const [isAddBookFormVisible, setIsAddBookFormVisible] = useState(false); // State to toggle form visibility
  const [userRole, setUserRole] = useState(''); // State to store user's role

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.user.role); // Set user role from the token
    }

    fetchBooks();
  }, []);

  // Handle Borrow functionality
  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;

        await api.post(
          'http://localhost:5000/api/transaction/borrow',
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

  // Handle Return functionality
  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;

        await api.post(
          'http://localhost:5000/api/transaction/return',
          { bookId, userId },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert('Book returned successfully');
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, availableCopies: book.availableCopies + 1 } : book
          )
        );
      }
    } catch (err) {
      console.error('Error returning book:', err.message);
      alert('Error returning book');
    }
  };

  // Handle Delete Book
  const handleDeleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await api.delete(`http://localhost:5000/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        alert('Book deleted successfully');
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      }
    } catch (err) {
      console.error('Error deleting book:', err.message);
      alert('Error deleting book');
    }
  };

  // Toggle delete mode visibility
  const toggleDeleteMode = () => {
    setIsDeleteMode((prevState) => !prevState);
    setIsAddBookFormVisible(false); // Hide Add Book form when Delete mode is activated
  };

  // Toggle Add Book form visibility
  const toggleAddBookForm = () => {
    setIsAddBookFormVisible((prevState) => !prevState);
    setIsDeleteMode(false); // Hide Delete mode when Add Book form is activated
  };

  return (
    <div className="container mt-5">
      <h2>Library Books</h2>

      {/* Add New Book Button - Only for Admin */}
      {userRole === 'Admin' && (
        <>
          <button
            className="btn btn-primary mb-3 mr-2"
            onClick={toggleAddBookForm}
          >
            {isAddBookFormVisible ? 'Cancel Add New Book' : 'Add New Book'}
          </button>
          <button
            className="btn btn-danger mb-3"
            onClick={toggleDeleteMode}
          >
            {isDeleteMode ? 'Cancel Delete' : 'Delete Book'}
          </button>
        </>
      )}

      {/* Conditionally render AddBook form */}
      {isAddBookFormVisible && <AddBook />}

      {/* Book List - Delete Mode */}
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id}>
            <BookCard
              book={book}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
            />
            {isDeleteMode && userRole === 'Admin' && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDeleteBook(book._id)}
              >
                DELETE
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;
