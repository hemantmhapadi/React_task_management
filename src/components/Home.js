import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MdOutlineTask, MdDelete, MdEdit } from "react-icons/md";

import {
  Typography,
  Box,
  Button,
  Snackbar,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [temptask, setTemptask] = useState();
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const sortPriority = (tasks) => {
    const sortedTasks = tasks.slice().sort((a, b) => {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setTasks(sortedTasks);
  };

  useEffect(() => {
    if (location.state && location.state.tasks) {
      setTasks(location.state.tasks);
      sortPriority(location.state.tasks);
    }
  }, [location.state]);

  const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  const handleRemoveTask = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (task) => {
    const updatedTasks = tasks.map((t) =>
      t === task ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);
  };
  const handleEditTask = (task) => {
    // Add your logic for handling the edit action here
   // const temptask = tasks.filter((t) => t ===task);
   // setTemptask(temptask);

   // const updatedTasks = tasks.filter((t) => t !== task);
   // setTasks(updatedTasks);
     //console.log(temptask[0].title);
      // navigate("/create-tasks", { replace: true, state: { temp : temptask } });
      
     // navigate("/create-tasks", { state: temptask } );
  };
  

  const renderTasks = (taskList, title) => {
    return (
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {title}
          </Typography>
          {taskList.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              There are no tasks to display.
            </Typography>
          ) : (
            taskList.map((task, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  border: `2px solid ${
                    task.priority === "high"
                      ? "#f44336"
                      : task.priority === "medium"
                      ? "#ffeb3b"
                      : "#4caf50"
                  }`,
                }}
              >
                {" "}
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {task.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveTask(task)} // sx={{ color: 'black', border: '1px solid black' }}
                    >
                      <MdDelete />
                    </Button>
                  
                    <Button
                      variant="outlined"
                      color="secondary"
                     onClick={() => handleEditTask(task)}
                    >
                      <MdEdit />
                    </Button>
                    {!task.completed && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleCompleteTask(task)}
                        // sx={{ color: 'black', border: '1px solid black' }}
                      >
                        <MdOutlineTask />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Paper>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box maxWidth="800px" mx="auto" p={3}>
        <Snackbar
          open={successMessage}
          autoHideDuration={3000}
          message="Task saved successfully!"
        />
        <Grid container spacing={2}>
          {/* {renderTasks(tasks.filter((task) => !task.completed), 'Open Tasks')}
          {renderTasks(tasks.filter((task) => task.completed), 'Completed Tasks')}  */}

          {renderTasks(
            tasks.filter((task) => !task.completed),
            "Open Tasks"
          )}

          {renderTasks(
            tasks.filter((task) => task.completed),
            "Completed Tasks"
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
