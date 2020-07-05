const Task = (title, description, dueDate, priority) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getTimeLeft = () => "1 day"
    const getPriority = () => priority;
    let Done = false;
    const getDone = () => isDone;
    const switchDone = () => {isDone = !isDone}

    return {getTitle, getDescription, getDueDate, getTimeLeft, getPriority, getDone, switchDone} 
}

export default Task