import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from '../web/node_modules/axios';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onCompleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks: propTasks, onEditTask, onCompleteTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tasks/')
      .then((response: AxiosResponse<Task[]>) => { // Specify the type for response
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {propTasks.map((task) => (
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
