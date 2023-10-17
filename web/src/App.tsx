import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from '../../shared_components/types'; // Import the Task type from your types.ts file
import TaskList from '../../shared_components/TaskList';
import AddTask from '../../shared_components/AddTask';
import EditTask from '../../shared_components/EditTask';
import CompleteTask from '../../shared_components/CompleteTask';

const API_BASE_URL = 'http://localhost:8000/api/tasks/';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    // Fetch the tasks from your Django REST API on component mount
    axios.get(API_BASE_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = (newTask: Task) => {
    // Add a new task to the list
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (editedTask: Task) => {
    // Update the task in the list
    const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task));
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleCompleteTask = (taskId: number) => {
    // Mark a task as completed in the list
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task));
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Todo App</h1>

      <TaskList
        tasks={tasks}
        onEditTask={(task) => setSelectedTask(task)}
        onCompleteTask={handleCompleteTask}
      />

      <AddTask onAddTask={handleAddTask} />

      {selectedTask && (
        <EditTask
          task={selectedTask}
          onEditTask={handleEditTask}
          onCancelEdit={() => setSelectedTask(null)}
        />
      )}

      <CompleteTask
        task={{ id: 0, title: '', description: '', completed: false }}
        onCompleteTask={handleCompleteTask}
      />
    </div>
  );
};

export default App;
