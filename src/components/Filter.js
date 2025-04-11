// frontend/src/components/Filter.js
import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Filter = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const handleFilter = () => {
    onFilterChange({ status, date });
  };

  const handleReset = () => {
    setStatus('');
    setDate('');
    onFilterChange({ status: '', date: '' });
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <FormControl sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {['Applied', 'Interview', 'Offer', 'Rejected'].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mr: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleFilter} sx={{ mr: 1 }}>
        Apply
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
};

export default Filter;
