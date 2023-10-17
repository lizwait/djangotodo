import React, { useState } from '../todo_web/node_modules/@types/react/ts5.0';
import axios from '../todo_web/node_modules/axios';

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
    <
