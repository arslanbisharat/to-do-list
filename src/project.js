let projects = [];

const Project = (title) => {
    const getTitle = () => title;
    let tasks = [];
    let active = true;
    const addTask = (task) => {
        tasks.push(task);
    }
    const removeTask = (index) => {
        tasks.splice(index, 1);
    }
    const getTasks = () => tasks;
    const store = () => {
        let storageArray  = [];
        for(let i of tasks){
            storageArray.push([i.getTitle(), i.getDescription(), i.getDueDate(), i.getPriority(), i.getDone()])
        }
        localStorage.setItem(title, JSON.stringify(storageArray));
    }
    const isActive = () => active;
    const activate = () => {active = true};
    const deactivate = () => {active = false};
    return {getTitle, addTask, removeTask, getTasks, isActive, activate, deactivate, store};
}

export {Project, projects}