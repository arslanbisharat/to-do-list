import {Task, tasks} from "./task";
import {Project, projects} from "./project";
import {renderTasks, renderProjects} from "./ui";

const createTask = (object) => {
    let task = Task("New Title", "this is a brief description", "2020-15-05", "urgent");
    tasks.push(task);
    renderTasks();
}

const createProject = (object) => {
    let project = Project("Main");
    projects.push(project);
    renderProjects();
}

export {createProject, createTask}; 