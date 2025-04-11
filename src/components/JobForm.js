// src/components/JobForm.js
import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Stack,
} from '@mui/material';

const JobForm = ({ onAddApplication }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    dateOfApplication: '',
    link: '',
  });

  // Define status options
  const statusOptions = useMemo(() => ['Applied', 'Interview', 'Offer', 'Rejected'], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validations
    if (!formData.company || !formData.role || !formData.dateOfApplication) return;
    onAddApplication(formData);
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      dateOfApplication: '',
      link: '',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        backgroundColor: 'white',
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Add Job Application
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          fullWidth
        />
        <FormControl fullWidth required>
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
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <TextField
          label="Application Link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Application
        </Button>
      </Stack>
    </Box>
  );
};

export default JobForm;
