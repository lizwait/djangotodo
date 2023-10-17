import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Task } from './types';

interface EditTaskProps {
  task: Task;
  onEditTask: (editedTask: Task) => void;
  onCancelEdit: () => void; // Define the onCancelEdit prop
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask, onCancelEdit }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditTask = () => {
    axios
      .put(`http://localhost:8000/api/tasks/${editedTask.id}/`, editedTask)
      .then((response: AxiosResponse<Task>) => {
        onEditTask(response.data);
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <input
        type="text"
        value={editedTask.title}
        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
      />
      <input
        type="text"
        value={editedTask.description}
        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
      />
      <button onClick={handleEditTask}>Save</button>
      <button onClick={onCancelEdit}>Cancel</button> {/* Use onCancelEdit prop */}
    </div>
  );
};

export default EditTask;
