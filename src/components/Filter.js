// src/components/Filter.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from '@mui/material';

const Filter = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const applyFilter = () => onFilterChange({ status, date });
  const resetFilter = () => {
    setStatus('');
    setDate('');
    onFilterChange({ status: '', date: '' });
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'white',
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
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
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={applyFilter}>
          Apply
        </Button>
        <Button variant="outlined" onClick={resetFilter}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
};

export default Filter;
