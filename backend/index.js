const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the task
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
});

// Create a model for the task
const Task = mongoose.model('Task', taskSchema);

const app = express();
app.use(express.json());

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;

  const newTask = new Task({
    title,
    description,
    priority,
  });

  newTask.save()
    .then(() => {
      res.status(201).json({ message: 'Task created successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while creating the task' });
    });
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving tasks' });
    });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
