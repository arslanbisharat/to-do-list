import Task from "./task";
import {Project, projects} from "./project";
import {renderTasks, renderProjects} from "./ui";

const createTask = (title, description, deadline, priority, project) => {
    let task = Task(title, description, deadline, priority);
    project.addTask(task);
    project.store();
    renderTasks(project);
}

const createProject = (title) => {
    let project = Project(title);
    projects.push(project);
    project.store();
    renderProjects();
    if(projects.length > 0){
            for(let i in projects){
            projects[i].deactivate();
            document.getElementsByClassName("project")[i].classList = "project";
        }
    }
    projects[projects.length-1].activate();
    document.getElementsByClassName("project")[projects.length-1].classList = "project active" // switch focus to new project
    renderTasks(project);
}

export {createProject, createTask};