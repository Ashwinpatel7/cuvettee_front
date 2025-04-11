import { useState, useEffect } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Add as AddIcon,
  Sort as SortIcon,
  FilterList as FilterIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobCard from './components/JobCard';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const statusColors = {
  Applied: '#3f51b5',
  Interview: '#ff9800',
  Offer: '#4caf50',
  Rejected: '#f44336'
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [editJob, setEditJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/api/jobs', {
          params: { status: filter !== 'all' ? filter : null, sort }
        });
        setJobs(data);
        setError('');
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filter, sort]);

  const handleAddJob = async (jobData) => {
    try {
      if (editJob) {
        await api.put(`/api/jobs/${editJob._id}`, jobData);
      } else {
        await api.post('/api/jobs', jobData);
      }
      setOpenForm(false);
      setEditJob(null);
      const { data } = await api.get('/api/jobs');
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving job');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      setError('Error deleting job');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div>
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              Job Tracker
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setOpenForm(true)}
            >
              New Application
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            select
            label="Filter by Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <Tab label="All" value="all" />
            {Object.keys(statusColors).map(status => (
              <Tab key={status} label={status} value={status} />
            ))}
          </TextField>
          <TextField
            select
            label="Sort by Date"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <Tab label="Newest First" value="newest" />
            <Tab label="Oldest First" value="oldest" />
          </TextField>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <AnimatePresence>
          {filteredJobs.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                No jobs found. Add your first application!
              </Typography>
            </Paper>
          ) : (
            filteredJobs.map(job => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard
                  job={job}
                  onDelete={handleDelete}
                  onEdit={() => {
                    setEditJob(job);
                    setOpenForm(true);
                  }}
                  colors={statusColors}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </Container>

      <Dialog 
        open={openForm} 
        onClose={() => {
          setOpenForm(false);
          setEditJob(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editJob ? 'Edit Application' : 'New Job Application'}
        </DialogTitle>
        <DialogContent>
          <JobForm 
            onSubmit={handleAddJob} 
            initialData={editJob}
            onCancel={() => {
              setOpenForm(false);
              setEditJob(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;