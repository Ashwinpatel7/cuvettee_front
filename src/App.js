// src/App.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Filter from './components/Filter';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/applications';

function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState({ status: '', date: '' });
  const [error, setError] = useState('');

  // Fetch applications with optional filters
  const fetchApplications = useCallback(async (filters = {}) => {
    try {
      let query = '';
      if (filters.status) query += `?status=${filters.status}`;
      if (filters.date)
        query += query ? `&date=${filters.date}` : `?date=${filters.date}`;

      const res = await fetch(`${API_URL}${query}`);
      if (!res.ok) throw new Error('Unable to fetch applications');
      const data = await res.json();
      setApplications(data);
      setError('');
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchApplications(filter);
  }, [fetchApplications, filter]);

  const handleAddApplication = async (newApp) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
      if (!res.ok) throw new Error('Failed to add application');
      const savedApp = await res.json();
      setApplications((prev) => [savedApp, ...prev]);
      setError('');
    } catch (err) {
      console.error('Error adding application:', err);
      setError(err.message);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete application');
      setApplications((prev) => prev.filter((app) => app._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting application:', err);
      setError(err.message);
    }
  };

  const handleUpdateApplication = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to update application');
      const updatedApp = await res.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApp : app))
      );
      setError('');
    } catch (err) {
      console.error('Error updating application:', err);
      setError(err.message);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Job Tracker
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <JobForm onAddApplication={handleAddApplication} />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Filter onFilterChange={setFilter} />
      </Box>
      
      <JobList
        applications={applications}
        onDelete={handleDeleteApplication}
        onUpdate={handleUpdateApplication}
      />
    </Container>
  );
}

export default App;
