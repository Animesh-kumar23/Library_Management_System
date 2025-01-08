import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleSignout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Library
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav"> {/* Remove ml-auto to left-align items */}
            {/* Show Dashboard and BookList when user is logged in */}
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">
                    Books
                  </Link>
                </li>
              </>
            )}

            {/* Show Login and Register when user is NOT logged in */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Show Signout when user IS logged in */}
            {token && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleSignout}>
                  Signout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
