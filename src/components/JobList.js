// frontend/src/components/JobList.js
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField
} from '@mui/material';

const JobList = ({ applications, onDelete, onUpdate }) => {
  const handleStatusChange = (id, e) => {
    onUpdate(id, { status: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      {applications.map((app) => (
        <Grid item key={app._id} xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{app.company}</Typography>
              <Typography variant="subtitle1">{app.role}</Typography>
              <Typography variant="body2">Applied on: {new Date(app.dateOfApplication).toLocaleDateString()}</Typography>
              {app.link && (
                <Typography variant="body2">
                  <a href={app.link} target="_blank" rel="noopener noreferrer">
                    Application Link
                  </a>
                </Typography>
              )}
              <Box sx={{ mt: 1 }}>
                <TextField
                  select
                  label="Status"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e)}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  {['Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </TextField>
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
