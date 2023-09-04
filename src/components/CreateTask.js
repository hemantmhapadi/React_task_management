import React, { useState } from 'react';
//import { ReactComponent as YatiIllustration } from 'react';

//import { confirmAlert } from "react-confirm-alert";

import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  Box,
  Grid,
  Container,
} from '@mui/material';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    //export(title,description);
  const onSelect = (e) => setPriority(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description) {
      setError('Please fill all the details');
      return;
    }



    console.log('task details saved');

    navigate('/', { replace: true, state: { title, description, priority } });
    
    
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        
       
        <Typography variant="subtitle1" align="center" gutterBottom>
          Create Task
        </Typography>
        
        <form onSubmit={handleSubmit}>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" size="small">
                  Priority:
                </FormLabel>
                <RadioGroup row value={priority} onChange={onSelect}>
                  <FormControlLabel
                    value="high"
                    control={<Radio size="small" />}
                    label="High"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio size="small" />}
                    label="Medium"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="low"
                    control={<Radio size="small" />}
                    label="Low"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              {error && (
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth size="small">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
          
                
        <Typography variant="subtitle1" align="center" gutterBottom>
          alibag
        </Typography>
        
        
               
      </Box>
    </Container>
  );
};

export default CreateTask;
