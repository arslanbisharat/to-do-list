let projects = [];

const Project = (title) => {
    const getTitle = () => title;
    return {getTitle};
}

export {Project, projects}