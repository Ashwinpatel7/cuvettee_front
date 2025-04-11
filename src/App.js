// src/App.js
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Box } from '@mui/material';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Filter from './components/Filter';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/applications';

function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState({ status: '', date: '' });

  const fetchApplications = useCallback(async (filters = {}) => {
    try {
      let query = '';
      if (filters.status) query += `?status=${filters.status}`;
      if (filters.date)
        query += query ? `&date=${filters.date}` : `?date=${filters.date}`;

      const res = await fetch(`${API_URL}${query}`);
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
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
      const savedApp = await res.json();
      setApplications((prev) => [savedApp, ...prev]);
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleUpdateApplication = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const updatedApp = await res.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updatedApp : app))
      );
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Job Tracker
      </Typography>
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
