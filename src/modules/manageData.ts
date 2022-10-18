export default (function manageData() {
    let selectedProject = 'all';

    function setSelectedProject(currentProject: string) {
        selectedProject = currentProject;
    };

    function getSelectedProject() {
        return selectedProject;
    };

    function createTodo(title: string, details: string, dueDate: string, priority: string, project: string, checked = false) {
        interface todoItemType {
            'title': string,
            'details': string,
            'dueDate': string,
            'priority': string,
            'project': string,
            'checked': boolean
        }
        const todoItem: todoItemType = {
            title,
            details,
            dueDate,
            priority,
            project,
            checked
        }
        return todoItem;
    };

    function addProject(e: Event, todos, listContainer: Element) {
        e.preventDefault();
    };

    return {
        setSelectedProject,
        getSelectedProject,
        createTodo
    };
})();