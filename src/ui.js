import createTask from "./logic"

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
    }
}

export default initialiseApp
