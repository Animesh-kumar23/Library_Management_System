import React from 'react';

const BookCard = ({ book, onBorrow, onReturn }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>Author:</strong> {book.author} <br />
          <strong>Genre:</strong> {book.genre} <br />
          <strong>Available Copies:</strong> {book.availableCopies}
        </p>
        
        {onBorrow && (
          <button
            className="btn btn-primary mr-2"
            onClick={() => onBorrow(book._id)}
            disabled={book.availableCopies <= 0}
          >
            Borrow
          </button>
        )}

        {onReturn && (
          <button
            className="btn btn-warning"
            onClick={() => onReturn(book._id)}  // Trigger onReturn when the button is clicked
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
