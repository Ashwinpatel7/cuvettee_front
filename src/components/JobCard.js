import { Card, CardContent, Typography, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';

const statusColors = {
  Applied: '#2196f3',
  Interview: '#ff9800',
  Offer: '#4caf50',
  Rejected: '#f44336'
};

const JobCard = ({ job, onDelete, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardContent>
        <Typography variant="h6">{job.company}</Typography>
        <Typography color="textSecondary" gutterBottom>{job.role}</Typography>
        <Chip 
          label={job.status} 
          sx={{ backgroundColor: statusColors[job.status], color: 'white' }}
        />
        <Typography variant="body2" mt={1}>
          Applied: {new Date(job.applicationDate).toLocaleDateString()}
        </Typography>
        {job.link && (
          <Typography variant="body2">
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              Job Posting
            </a>
          </Typography>
        )}
        <IconButton 
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleMenuOpen}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { onUpdate(job); handleMenuClose(); }}>
            <Edit sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => { onDelete(job._id); handleMenuClose(); }}>
            <Delete sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default JobCard;