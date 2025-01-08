import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddBook from './components/Book/AddBook';
import BookList from './components/Book/BookList';
import BorrowBook from './components/Book/BorrowBook';
import ReturnBook from './components/Book/ReturnBook';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/borrow" element={<BorrowBook />} />
        <Route path="/books/return" element={<ReturnBook />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;