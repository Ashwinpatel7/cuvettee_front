import { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const JobForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    company: '',
    role: '',
    status: 'Applied',
    applicationDate: new Date(),
    link: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        applicationDate: formData.applicationDate.toISOString()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          error={!!errors.company}
          helperText={errors.company}
          fullWidth
        />

        <TextField
          label="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          error={!!errors.role}
          helperText={errors.role}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            label="Status"
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            {Object.keys(statusColors).map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="Application Date"
          value={formData.applicationDate}
          onChange={(date) => setFormData({ ...formData, applicationDate: date })}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />

        <TextField
          label="Job Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              {initialData ? 'Update' : 'Add'} Application
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};

export default JobForm;