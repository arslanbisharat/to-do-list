/* eslint-disable no-restricted-syntax */
const projects = [];

const Project = (title) => {
  const getTitle = () => title;
  const tasks = [];
  let active = true;
  const addTask = (task) => {
    tasks.push(task);
  };
  const removeTask = (index) => {
    tasks.splice(index, 1);
  };
  const getTasks = () => tasks;
  const store = () => {
    const storageArray = [];
    for (const i of tasks) {
      storageArray.push([i.getTitle(), i.getDescription(),
        i.getDueDate(), i.getPriority(), i.getDone()]);
    }
    localStorage.setItem(title, JSON.stringify(storageArray));
  };
  const isActive = () => active;
  const activate = () => { active = true; };
  const deactivate = () => { active = false; };
  return {
    getTitle, addTask, removeTask, getTasks, isActive, activate, deactivate, store,
  };
};

export { Project, projects };