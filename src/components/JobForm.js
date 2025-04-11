import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

// Define status colors
const statusColors = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
  interview: 'blue'
};

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2
      }}
    >
      <Typography variant="h5" textAlign="center">
        Add Job
      </Typography>

      <TextField
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <TextField
        label="Position"
        name="position"
        value={formData.position}
        onChange={handleChange}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
        >
          {Object.keys(statusColors).map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="body2"
        sx={{
          color: statusColors[formData.status] || 'black',
          fontWeight: 'bold'
        }}
      >
        Current Status: {formData.status}
      </Typography>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default JobForm;
