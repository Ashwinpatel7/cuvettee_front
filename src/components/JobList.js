// src/components/JobList.js
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const JobList = ({ applications, onDelete, onUpdate }) => {
  const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'];

  const handleStatusChange = (id, event) => {
    onUpdate(id, { status: event.target.value });
  };

  return (
    <Grid container spacing={3}>
      {applications.map((app) => (
        <Grid item key={app._id} xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{app.company}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                {app.role}
              </Typography>
              <Typography variant="body2">
                Applied on: {new Date(app.dateOfApplication).toLocaleDateString()}
              </Typography>
              {app.link && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <a href={app.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                    Application Link
                  </a>
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={app.status}
                    label="Status"
                    onChange={(e) => handleStatusChange(app._id, e)}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardActions>
              <Button color="error" onClick={() => onDelete(app._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
