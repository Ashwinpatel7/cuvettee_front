// frontend/src/components/JobForm.js
import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography
} from '@mui/material';

const JobForm = ({ onAddApplication }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    dateOfApplication: '',
    link: ''
  });

  const statusOptions = useMemo(
    () => ['Applied', 'Interview', 'Offer', 'Rejected'],
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.company || !formData.role || !formData.dateOfApplication) return;
    onAddApplication(formData);
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      dateOfApplication: '',
      link: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Add Job Application
      </Typography>
      <TextField
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select name="status" value={formData.status} onChange={handleChange} label="Status">
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Date of Application"
        name="dateOfApplication"
        type="date"
        value={formData.dateOfApplication}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        label="Application Link"
        name="link"
        value={formData.link}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default JobForm;
