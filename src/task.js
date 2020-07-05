const Task = (title, description, dueDate, priority) => {
    let active = true;
    const getTitle = () => title;
    const updateTitle = (text) => {title = text};
    const getDescription = () => description;
    const updateDescription = (text) => {description = text};
    const getDueDate = () => dueDate;
    const updateDue = (text) => {dueDate = text};
    const getPriority = () => priority;
    const updatePriority = (text) => {priority = text};
    let isDone = false;
    const isActive = () => active;
    const activate = () => {active = true};
    const deactivate = () => {active = false};
    const getDone = () => isDone;
    const switchDone = () => {isDone = !isDone}

    return { getTitle, updateTitle, getDescription, updateDescription, getDueDate, updateDue, getPriority, updatePriority, isActive, activate, deactivate, getDone, switchDone }
}

export default Task