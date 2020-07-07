/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/no-cycle */
import Task from './task';
import { Project, projects } from './project';
import { renderTasks, renderProjects } from './ui';

const createTask = (title, description, deadline, priority, project) => {
  const task = Task(title, description, deadline, priority);
  project.addTask(task);
  project.store();
  renderTasks(project);
};

const createProject = (title) => {
  const project = Project(title);
  projects.push(project);
  project.store();
  renderProjects();
  if (projects.length > 0) {
    for (const i in projects) {
      projects[i].deactivate();
      document.getElementsByClassName('project')[i].classList = 'project';
    }
  }
  projects[projects.length - 1].activate();
  document.getElementsByClassName('project')[projects.length - 1].classList = 'project active'; // switch focus to new project
  renderTasks(project);
};

export { createProject, createTask };