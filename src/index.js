/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { initialiseApp, selectProject } from './ui';
import { projects, Project } from './project';
import Task from './task';

const retrieveProjects = () => {
  if (localStorage.length == 0) {
    const newProject = Project('Main');
    const newProjectTask = Task('Create a new Project', new Date().toDateInputValue(), 'high');
    newProject.addTask(newProjectTask);
    const newTaskTask = Task('Create a new Task', new Date().toDateInputValue(), 'high');
    newProject.addTask(newTaskTask);
    const markTaskDoneTask = Task('Mark a Task as done', new Date().toDateInputValue(), 'high');
    newProject.addTask(markTaskDoneTask);
    const deleteTaskTask = Task('Delete a Task', new Date().toDateInputValue(), 'high');
    newProject.addTask(deleteTaskTask);
    const deleteProjectTask = Task('Delete a Project', new Date().toDateInputValue(), 'high');
    newProject.addTask(deleteProjectTask);
    const updateTaskTask = Task('Update a Task', new Date().toDateInputValue(), 'high');
    newProject.addTask(updateTaskTask);
    projects.push(newProject);
    for (const i in projects) {
      projects[i].store();
    }
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const newProject = Project(localStorage.key(i));
      for (let j = 0; j < JSON.parse(localStorage.getItem(localStorage.key(i))).length; j++) {
        const taskTemplate = JSON.parse(localStorage.getItem(localStorage.key(i)))[j];
        const newTask = Task(taskTemplate[0], taskTemplate[1], taskTemplate[2], taskTemplate[3]);
        if (taskTemplate[4]) {
          newTask.switchDone();
        }
        newProject.addTask(newTask);
      }
      projects.push(newProject);
    }
  }
};

retrieveProjects();
initialiseApp();
selectProject(document.getElementsByClassName('project')[0].innerHTML);