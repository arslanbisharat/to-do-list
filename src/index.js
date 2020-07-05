import {initialiseApp, selectProject} from "./ui"
import {projects, Project} from "./project"
import Task from "./task"

const retrieveProjects = () => {
    if(localStorage.length == 0){
        let newProject = Project("Main");
        let newProjectTask = Task("Create a new Project", new Date().toDateInputValue(), "high");
        newProject.addTask(newProjectTask);
        let newTaskTask = Task("Create a new Task", new Date().toDateInputValue(), "high");
        newProject.addTask(newTaskTask);
        let markTaskDoneTask = Task("Mark a Task as done", new Date().toDateInputValue(), "high");
        newProject.addTask(markTaskDoneTask);
        let deleteTaskTask = Task("Delete a Task", new Date().toDateInputValue(), "high");
        newProject.addTask(deleteTaskTask);
        let deleteProjectTask = Task("Delete a Project", new Date().toDateInputValue(), "high");
        newProject.addTask(deleteProjectTask);
        let updateTaskTask = Task("Update a Task", new Date().toDateInputValue(), "high");
        newProject.addTask(updateTaskTask);
        projects.push(newProject);
        for(let i in projects){
            projects[i].store();
        }
    } else {
        for(let i = 0; i < localStorage.length; i++){
            let newProject = Project(localStorage.key(i));
            for(let j = 0; j < JSON.parse(localStorage.getItem(localStorage.key(i))).length; j++){
                let taskTemplate = JSON.parse(localStorage.getItem(localStorage.key(i)))[j];
                let newTask = Task(taskTemplate[0], taskTemplate[1], taskTemplate[2], taskTemplate[3]);
                if(taskTemplate[4]){
                    newTask.switchDone();
                }
                newProject.addTask(newTask);
            }
            projects.push(newProject);
        }
    }
}

retrieveProjects();
initialiseApp();
selectProject(document.getElementsByClassName("project")[0].innerHTML);