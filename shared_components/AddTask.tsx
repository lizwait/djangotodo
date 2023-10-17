import React, { useState } from 'react';
import axios from '../web/node_modules/axios';
import { Task } from './types'; // Import the Task type from your types.ts file

interface AddTaskProps {
  onAddTask: (newTask: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    axios
      .post('http://localhost:8000/api/tasks/', {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
      })
      .then((response) => {
        onAddTask(response.data);
        setNewTaskTitle('');
        setNewTaskDescription('');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
