/* eslint-disable func-names */
/* eslint-disable no-extend-native */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/no-cycle
import { createTask, createProject } from './logic';
import { projects } from './project';

// The initial state of the app that appears on page load

const initialiseApp = () => {
  // App is a parent element
  const app = document.getElementById('app');
  renderPanes(app);
  // eslint-disable-next-line no-use-before-define
  functionaliseInputs();
  // eslint-disable-next-line no-use-before-define
  renderProjects();
};

const renderPanes = (app) => {
  const panes = ['projects', 'tasks', 'details'];
  // eslint-disable-next-line guard-for-in
  for (const i in panes) {
    const pane = document.createElement('div');
    pane.id = `${panes[i]}-pane`;
    app.appendChild(pane);
    const title = document.createElement('h1');
    title.id = `${panes[i]}-title`;
    title.textContent = panes[i];
    pane.appendChild(title);
    if (i < 2) {
      const inputContainer = document.createElement('div');
      inputContainer.id = `${panes[i]}-input-container`;
      pane.appendChild(inputContainer);
      const input = document.createElement('input');
      input.id = `${panes[i]}-input`;
      input.placeholder = `New ${panes[i].slice(0, panes[i].length - 1)}...`;
      inputContainer.appendChild(input);
      const container = document.createElement('div');
      container.id = `${panes[i]}-container`;
      pane.appendChild(container);
    } else {
      pane.classList = 'empty';
      const paneEmpty = document.createElement('div');
      paneEmpty.textContent = 'Please select task to show details';
      paneEmpty.id = 'details-empty';
      pane.appendChild(paneEmpty);
    }
  }
};

const renderTasks = (project) => {
  if (projects.length == 0) { alert('Please create a project first.'); }
  if (!project) {
    project = projects.filter(project => project.isActive() == true)[0];
    project.store();
  }
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';
  for (const i in project.getTasks().sort((a, b) => {
    if (!a.getDone()) { a = 0; } else { a = 1; }
    if (!b.getDone()) { b = 0; } else { b = 1; }
    return a - b;
  })) {
    const newTaskTitle = document.createElement('div');
    const allTasksInDOM = document.getElementsByClassName('task');
    newTaskTitle.classList = 'task';
    if (project.getTasks()[i].getDone()) {
      newTaskTitle.classList += ' done';
    }
    newTaskTitle.textContent = project.getTasks()[i].getTitle();
    newTaskTitle.addEventListener('mouseenter', () => {
      const deleteTaskButton = document.createElement('a');
      deleteTaskButton.textContent = '×';
      deleteTaskButton.id = 'delete-task';
      allTasksInDOM[i].appendChild(deleteTaskButton);
      const doneTaskButton = document.createElement('a');
      doneTaskButton.textContent = '✓';
      doneTaskButton.id = 'done-task';
      allTasksInDOM[i].appendChild(doneTaskButton);
    });
    newTaskTitle.addEventListener('mouseleave', () => {
      document.getElementById('delete-task').remove();
      document.getElementById('done-task').remove();
    });
    newTaskTitle.addEventListener('click', () => {
      const selectedTaskTitle = window.event.target.textContent.substring(0,
        window.event.target.textContent.length - 2); // Cut "x" from string
      if (window.event.target.textContent == '×') {
        deleteTask(project, window.event.target);
      } else if (window.event.target.textContent == '✓') {
        markTaskDone(project, window.event.target);
      } else {
        selectTask(project, selectedTaskTitle);
      }
    });
    tasksContainer.appendChild(newTaskTitle);
  }
};

const renderProjects = () => {
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  for (const i in projects) {
    const projectTitle = document.createElement('div');
    const projectsDOM = document.getElementsByClassName('project');
    projectTitle.classList = 'project';
    projectTitle.textContent = projects[i].getTitle();
    projectTitle.addEventListener('mouseenter', () => {
      const deleteProjectButton = document.createElement('a');
      deleteProjectButton.textContent = '×';
      deleteProjectButton.id = 'delete-project';
      projectsDOM[i].appendChild(deleteProjectButton);
    });
    projectTitle.addEventListener('mouseleave', () => {
      document.getElementById('delete-project').remove();
    });
    projectTitle.addEventListener('click', () => {
      const selectedProjectName = window.event.target.textContent.substring(0,
        window.event.target.textContent.length - 1); // Cut "x" from string
      if (window.event.target.textContent == '×') {
        deleteProject(window.event.target);
      } else {
        selectProject(selectedProjectName);
      }
    });
    projectsContainer.appendChild(projectTitle);
  }
};

const functionaliseInputs = () => {
  functionaliseProjectsInput();
  functionaliseTasksInput();
};

const functionaliseProjectsInput = () => {
  const projectsInput = document.getElementById('projects-input');
  projectsInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (projectsInput.value != '') {
        createProject(window.event.target.value);
        projectsInput.value = ''; // empty field
        projectsInput.blur(); // inactivate field
      } else {
        alert('Please enter project name before creating it.');
      }
    }
  });
};

const callCreateTask = (title) => {
  if (projects) {
    if (title != '') {
      const title = document.getElementById('tasks-input').value;
      const description = document.getElementById('tasks-description').value;
      const deadline = document.getElementById('select-deadline').value;
      const priority = document.getElementById('select-priority').value;
      createTask(title, description, deadline, priority,
        projects.filter(project => project.isActive() == true)[0]);
      document.getElementById('select-priority').remove();
      document.getElementById('select-deadline').remove();
      document.getElementById('tasks-description').remove();
      document.getElementById('create-task-button').remove();
    } else {
      alert('Please enter task name before creating it.');
    }
  } else { alert('Please select a project first.'); }
};

const functionaliseTasksInput = () => {
  const tasksInput = document.getElementById('tasks-input');
  tasksInput.addEventListener('click', () => {
    if (!document.getElementById('tasks-description')) {
      const tasksDescriptionInput = document.createElement('textarea');
      tasksDescriptionInput.id = 'tasks-description';
      tasksDescriptionInput.placeholder = 'Enter task description here...';
      const createTaskButton = document.createElement('div');
      createTaskButton.id = 'create-task-button';
      createTaskButton.textContent = '+';
      createTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        callCreateTask();
        tasksInput.value = '';
        tasksInput.blur();
      });
      tasksInput.after(createTaskButton);
      tasksInput.after(tasksDescriptionInput);
      const setDeadlineButton = document.createElement('input');
      setDeadlineButton.type = 'date';
      setDeadlineButton.id = 'select-deadline';
      setDeadlineButton.value = new Date().toDateInputValue();
      tasksInput.after(setDeadlineButton);
      const setPriorityButton = document.createElement('select');
      setPriorityButton.id = 'select-priority';
      const options = ['low', 'normal', 'high', 'urgent'];
      for (const i in options) {
        const option = document.createElement('option');
        option.textContent = options[i];
        setPriorityButton.appendChild(option);
      }
      setPriorityButton.value = options[2];
      setDeadlineButton.after(setPriorityButton);
      const app = document.getElementById('app');
      app.addEventListener('click', () => {
        if (event.target.parentNode != null && event.target.parentNode.id != 'tasks-input-container' && event.target.nodeName != 'OPTION' && event.target.id != 'create-task-button') {
          tasksDescriptionInput.remove();
          setPriorityButton.remove();
          setDeadlineButton.remove();
          createTaskButton.remove();
        }
      });
    }
  });
  tasksInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      callCreateTask();
      tasksInput.value = '';
      tasksInput.blur();
    }
  });
};

const deleteProject = () => {
  const projectToDelete = window.event.target.parentNode;
  const projectsContainer = window.event.target.parentNode.parentNode;
  const projectToDeleteIndex = Array.prototype.indexOf.call(projectsContainer.children,
    projectToDelete);
  projectsContainer.removeChild(projectToDelete);
  projects.splice(projectToDeleteIndex, 1);
  localStorage.removeItem(projectToDelete.textContent.substring(0,
    projectToDelete.textContent.length - 1));
  renderProjects();
  document.getElementById('tasks-container').innerHTML = '';
};

const deleteTask = (project) => {
  const taskToDelete = window.event.target.parentNode;
  const tasksContainer = window.event.target.parentNode.parentNode;
  const taskToDeleteIndex = Array.prototype.indexOf.call(tasksContainer.children, taskToDelete);
  tasksContainer.removeChild(taskToDelete);
  project.removeTask(taskToDeleteIndex);
  project.store();
  renderTasks(project);
};

const selectProject = (name) => {
  const selectedProject = projects.filter(project => project.getTitle() == name)[0];
  const deselectedProjects = projects.filter(project => project.getTitle() != name);
  for (const i in deselectedProjects) {
    deselectedProjects[i].deactivate();
  }
  selectedProject.activate();
  const projectsDOM = document.getElementsByClassName('project');
  for (let i = 0; i < projectsDOM.length; i++) { // each inactive projects
    projectsDOM[i].classList = 'project'; // has corresponding no 'active' style
  } // while the active project
  if (window.event) { // has 'active' style
    window.event.target.classList = 'project active';
  } else {
    document.getElementsByClassName('project')[0].classList = 'project active';
  }
  renderTasks(selectedProject);
};

const selectTask = (project, name) => {
  const selectedTask = project.getTasks().filter(task => task.getTitle() == name)[0];
  const deselectedTasks = project.getTasks().filter(task => task.getTitle() != name);
  for (const i in deselectedTasks) {
    deselectedTasks[i].deactivate();
  }
  selectedTask.activate();
  const allTasksInDOM = document.getElementsByClassName('task');
  for (let i = 0; i < allTasksInDOM.length; i++) {
    if (allTasksInDOM[i].classList.contains('done')) {
      allTasksInDOM[i].classList = 'task done';
    } else {
      allTasksInDOM[i].classList = 'task';
    }
  }
  if (window.event.target.classList.contains('done')) {
    window.event.target.classList = 'task done active';
  } else {
    window.event.target.classList = 'task active';
  }
  renderDetails(selectedTask);
};

const markTaskDone = (project) => {
  const taskToMark = window.event.target.parentNode;
  const tasksContainer = window.event.target.parentNode.parentNode;
  const taskToMarkIndex = Array.prototype.indexOf.call(tasksContainer.children, taskToMark);
  project.getTasks()[taskToMarkIndex].switchDone();
  project.store();
  renderTasks(project);
};

const renderDetails = (task) => {
  const details = document.getElementById('details-pane');
  details.classList = 'show-content';
  details.innerHTML = '';
  const taskTitle = document.createElement('h2');
  taskTitle.id = 'details-title';
  taskTitle.textContent = task.getTitle();
  details.appendChild(taskTitle);
  const taskDescriptionLabel = document.createElement('h3');
  taskDescriptionLabel.id = 'details-description-label';
  taskDescriptionLabel.textContent = 'Description: ';
  details.appendChild(taskDescriptionLabel);
  const taskDescription = document.createElement('div');
  taskDescription.id = 'details-description';
  taskDescription.textContent = task.getDescription();
  if (taskDescription.textContent == '') {
    taskDescription.textContent = 'Description was not specified. Click to edit.';
  }
  details.appendChild(taskDescription);
  const taskDueLabel = document.createElement('h3');
  taskDueLabel.id = 'details-due-label';
  taskDueLabel.textContent = 'Due: ';
  details.appendChild(taskDueLabel);
  const taskDue = document.createElement('div');
  taskDue.id = 'details-due';
  taskDue.textContent = task.getDueDate();
  details.appendChild(taskDue);
  const taskPriorityLabel = document.createElement('h3');
  taskPriorityLabel.id = 'details-priority-label';
  taskPriorityLabel.textContent = 'Priority: ';
  details.appendChild(taskPriorityLabel);
  const taskPriority = document.createElement('div');
  taskPriority.id = 'details-priority';
  taskPriority.textContent = task.getPriority();
  details.appendChild(taskPriority);
  functionaliseDetails(task);
};

const functionaliseDetails = (task) => {
  const title = document.getElementById('details-title');
  title.addEventListener('click', () => {
    const editText = title.textContent;
    const titleInput = document.createElement('input');
    titleInput.id = 'details-title-edit';
    title.after(titleInput);
    titleInput.value = editText;
    title.remove();
    titleInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        if (titleInput.value != '') {
          task.updateTitle(titleInput.value);
          titleInput.remove();
          renderDetails(task);
          renderTasks();
        } else {
          alert('Please make sure the task name is not empty.');
        }
      }
    });
  });
  const description = document.getElementById('details-description');
  description.addEventListener('click', () => {
    const editText = description.textContent;
    const descriptionInput = document.createElement('textarea');
    const descriptionInputDiv = document.createElement('div');
    descriptionInputDiv.id = 'details-description-container';
    descriptionInput.id = 'details-description-edit';
    description.after(descriptionInputDiv);
    descriptionInputDiv.appendChild(descriptionInput);
    descriptionInput.value = editText;
    description.remove();
    const updateDescriptionButton = document.createElement('a');
    updateDescriptionButton.textContent = '✓';
    updateDescriptionButton.id = 'update-description-button';
    descriptionInput.after(updateDescriptionButton);
    updateDescriptionButton.addEventListener('click', () => {
      task.updateDescription(descriptionInput.value);
      descriptionInputDiv.remove();
      updateDescriptionButton.remove();
      renderDetails(task);
      renderTasks();
    });
  });
  const due = document.getElementById('details-due');
  due.addEventListener('click', () => {
    const editDue = due.textContent;
    const dueInput = document.createElement('input');
    dueInput.type = 'date';
    dueInput.id = 'details-due-edit';
    const dueInputDiv = document.createElement('div');
    dueInputDiv.id = 'details-due-container';
    due.after(dueInputDiv);
    dueInputDiv.appendChild(dueInput);
    dueInput.value = editDue;
    due.remove();
    const updateDueButton = document.createElement('a');
    updateDueButton.textContent = '✓';
    updateDueButton.id = 'update-due-button';
    dueInput.after(updateDueButton);
    updateDueButton.addEventListener('click', () => {
      task.updateDue(dueInput.value);
      dueInputDiv.remove();
      updateDueButton.remove();
      renderDetails(task);
      renderTasks();
    });
  });
  const priority = document.getElementById('details-priority');
  priority.addEventListener('click', () => {
    const editPriority = priority.textContent;
    const priorityInput = document.createElement('select');
    priorityInput.id = 'details-priority-edit';
    const options = ['low', 'normal', 'high', 'urgent'];
    for (const i in options) {
      const option = document.createElement('option');
      option.textContent = options[i];
      priorityInput.appendChild(option);
    }
    priorityInput.value = editPriority;
    const priorityInputDiv = document.createElement('div');
    priorityInputDiv.id = 'details-priority-container';
    priority.after(priorityInputDiv);
    priorityInputDiv.appendChild(priorityInput);
    priority.remove();
    const updatePriorityButton = document.createElement('a');
    updatePriorityButton.textContent = '✓';
    updatePriorityButton.id = 'update-priority-button';
    priorityInput.after(updatePriorityButton);
    updatePriorityButton.addEventListener('click', () => {
      task.updatePriority(priorityInput.value);
      priorityInputDiv.remove();
      updatePriorityButton.remove();
      renderDetails(task);
      renderTasks();
    });
  });
};

// Extend Date to allow default date
Date.prototype.toDateInputValue = (function () {
  const local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});

export { initialiseApp, selectProject };
export { renderTasks, renderProjects };