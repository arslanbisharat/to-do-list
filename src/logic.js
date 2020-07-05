import {Task, tasks} from "./task";

const createTask = (object) => {
    let task = Task("New Title", "this is a brief description", "2020-15-05", "urgent");
    tasks.push(task);
    for(let i in tasks){
        let tasksPane = document.getElementById("tasks-pane");
        let newTaskTitle  = document.createElement("div");
        newTaskTitle.classList = "task";
        newTaskTitle.textContent = tasks[i].getTitle();
        tasksPane.appendChild(newTaskTitle);
    }
}

export default createTask;