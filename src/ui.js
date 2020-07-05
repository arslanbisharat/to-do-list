import {createTask, createProject} from "./logic"
import {Project, projects} from "./project"
import {Task, tasks} from "./task"
// The initial state of the app that appears on page load

const initialiseApp = () => {
    // App is a parent element
    let app = document.getElementById("app");
    renderPanes(app);
    // Create button to create a new task
    let newTaskButton = document.createElement("a");
    newTaskButton.id = "new-task-btn";
    newTaskButton.textContent = "+";
    newTaskButton.addEventListener("click", (e) => { 
        createTask(window.event.target);
     }, false);
    app.appendChild(newTaskButton);
}   
 // Create button to create a new project
 let newProjectButton = document.createElement("a");
 newProjectButton.id = "new-project-btn";
 newProjectButton.textContent = "P";
 newProjectButton.addEventListener("click", (e) => { 
     createProject(window.event.target);
  }, false);
 app.appendChild(newProjectButton);

const renderPanes = (app) => {
    let panes = ["projects", "tasks", "details"];
    for(let i in panes){
        let pane = document.createElement("div");
        pane.id = panes[i] + "-pane";
        app.appendChild(pane);
        let title = document.createElement("h1");
        title.id = panes[i] + "-title";
        title.textContent = panes[i];
        pane.appendChild(title);

        if(i < 2){
            let input = document.createElement("input");
            input.id = panes[i] + "-input";
            input.textContent = "Type to create a new " + panes[i] + "...";
            pane.appendChild(input);
            let container = document.createElement("div");
            container.id = panes[i] + "-container";
            pane.appendChild(container);
        }
    }
}

const renderTasks = () => {
    let tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
    for(let i in tasks){
        let newTaskTitle  = document.createElement("div");
        newTaskTitle.classList = "task";
        newTaskTitle.textContent = tasks[i].getTitle();
        tasksContainer.appendChild(newTaskTitle);
    }
}

const renderProjects = () => {
    let projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
    for(let i in projects){
        let newProjectTitle  = document.createElement("div");
        newProjectTitle.classList = "project";
        newProjectTitle.textContent = projects[i].getTitle();
        projectsContainer.appendChild(newProjectTitle);
    }
}

export default initialiseApp;
export {renderTasks, renderProjects}; 