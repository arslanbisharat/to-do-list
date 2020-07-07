/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable import/named */
import { Task, tasks } from './task';

const renderTask = (object) => {
  console.log(object);
  const task = Task('New Title', 'this is a brief description', '2020-15-05', 'urgent');
  tasks.push(task);
  for (const i in tasks) {
    const tasksPane = document.getElementById('tasks-pane');
    const newTaskTitle = document.createElement('div');
    newTaskTitle.textContent = tasks[i].getTitle();
    tasksPane.appendChild(newTaskTitle);
  }
};

export default renderTask;