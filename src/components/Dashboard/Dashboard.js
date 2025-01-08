import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBooks: 0, borrowedBooks: 0, availableBooks: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard');
        setStats(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Library Dashboard</h2>
      <ul className="list-group">
        <li className="list-group-item">Total Books: {stats.totalBooks}</li>
        <li className="list-group-item">Borrowed Books: {stats.borrowedBooks}</li>
        <li className="list-group-item">Available Books: {stats.availableBooks}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
