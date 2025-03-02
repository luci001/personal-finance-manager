import React, { useState } from 'react';
import {IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { getDescription } from '../utils/ApiRequest';

const InfoButton = ({ transactionId }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(`${getDescription}/${transactionId}`);
      setDescription(response.data.transaction.description);
      setOpen(true);
    } catch (err) {
      setError('Error fetching transaction details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDescription(''); // Clear description when closing
  };

  return (
    <div style={{ marginTop: '-7px' }}>
      <Tooltip title="Click for more information">
        <IconButton onClick={handleClickOpen}>
          <InfoIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <p>{description}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="outline-primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InfoButton;