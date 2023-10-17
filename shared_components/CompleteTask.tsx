import React from '../web/node_modules/@types/react/ts5.0';
import axios from '../web/node_modules/axios';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface CompleteTaskProps {
  task: Task;
  onCompleteTask: (taskId: number) => void;
}

const CompleteTask: React.FC<CompleteTaskProps> = ({ task, onCompleteTask }) => {
  const handleCompleteTask = () => {
    axios
      .patch(`http://localhost:8000/api/tasks/${task.id}/`, { completed: true })
      .then(() => {
        onCompleteTask(task.id);
      })
      .catch((error) => {
        console.error('Error completing task:', error);
      });
  };

  return (
    <div>
      <h2>Complete Task</h2>
      <p>Task: {task.title}</p>
      <button onClick={handleCompleteTask}>Mark as Completed</button>
    </div>
  );
};

export default CompleteTask;
