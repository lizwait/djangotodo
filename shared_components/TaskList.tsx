import React, { useState, useEffect } from '../todo_web/node_modules/@types/react/ts5.0';
import axios from '../todo_web/node_modules/axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from your Django API when the component mounts
    axios
      .get('http://localhost:8000/api/tasks/') // Update the API endpoint to use your local Django server
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
