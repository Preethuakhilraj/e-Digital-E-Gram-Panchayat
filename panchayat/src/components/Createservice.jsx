import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateService = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!service.name) newErrors.name = 'Service name is required';
    if (!service.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onCreate(service);
      toast.success('Service created successfully!');
      setService({ name: '', description: '' });
      setErrors({});
      handleClose();
    } catch (error) {
      toast.error('Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Service
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Service</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Service Name"
            name="name"
            value={service.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={service.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CreateService.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateService;
