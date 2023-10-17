import React, { useState } from '../web/node_modules/@types/react/ts5.0';
import axios from '../web/node_modules/axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface EditTaskProps {
  task: Task;
  onEditTask: (editedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask }) => {
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
  const [editedTaskDescription, setEditedTaskDescription] = useState(task.description);

  const handleEditTask = () => {
    axios
      .put(`http://localhost:8000/api/tasks/${task.id}/`, {
        title: editedTaskTitle,
        description: editedTaskDescription,
        completed: task.completed,
      })
      .then((response) => {
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
        value={editedTaskTitle}
        onChange={(e) => setEditedTaskTitle(e.target.value)}
      />
      <textarea
        value={editedTaskDescription}
        onChange={(e) => setEditedTaskDescription(e.target.value)}
      />
      <button onClick={handleEditTask}>Save Changes</button>
    </div>
  );
};

export default EditTask;
