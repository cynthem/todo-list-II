import { TodoObject, ProjectsObject } from "../util/types";

export default (function manageData() {
    let selectedProject = 'all';

    function setSelectedProject(currentProject: string) {
        selectedProject = currentProject;
    };

    function getSelectedProject() {
        return selectedProject;
    };

    function createTodo(title: string, details: string, dueDate: string, priority: string, project: string, checked = false) {
        const todoItem: TodoObject = {
            title,
            details,
            dueDate,
            priority,
            project,
            checked
        }
        return todoItem;
    };

    function addProject(e: Event, todos: ProjectsObject, listContainer: Element) {
        e.preventDefault();

        /* const newProject = (document.querySelector('#add-project')).value;

        if (newProject) {
            if (newProject.toLowerCase === 'all') {
                setSelectedProject('all');
                changeDOM.highlightReloadedFilter('all');
                changeDOM.renderAllTodos(todos, listContainer);
            } else if (newProject.toLowerCase() === 'today') {
                setSelectedProject('today');
                changeDOM.renderTodayTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter('today');
            } else if ((newProject.toLowerCase() === 'week') || (newProject.toLowerCase() === 'this week')) {
                setSelectedProject('week');
                changeDOM.renderWeekTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter('week');
            } else if (newProject in todos) {
                setSelectedProject(newProject);
                changeDOM.renderProjectTodos(todos, listContainer);
                changeDOM.highlightReloadedFilter(getSelectedProject());
            } else {
                todos[newProject] = [];
                setSelectedProject('all');
                changeDOM.highlightReloadedFilter(getSelectedProject());
                changeDOM.renderProjectList(todos, listContainer);
                changeDOM.renderAllTodos(todos, listContainer);
            }
        }

        localStorage.setItem('todos', JSON.stringify(todos)); */
    };

    function addTodo(e: Event, todos: ProjectsObject, listContainer: Element) {
        e.preventDefault();

        /* const todoTitle = (document.querySelector('.add-input')).value;
        const todoDetails = (document.querySelector('.add-textarea')).value;
        const todoDate = (document.querySelector('#new-date')).value;
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked')).value;
        const todoProject = getSelectedProject();

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todos[todoProject].push(newTodo);

        if (manageData.getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else if (manageData.getSelectedProject() === 'today') {
            changeDOM.renderTodayTodos(todos, listContainer);
        } else if (manageData.getSelectedProject() === 'week') {
            changeDOM.renderWeekTodos(todos, listContainer); 
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        }
        
        changeDOM.renderProjectList(todos, listContainer); */
    };

    function editTodo(e: Event, todos: ProjectsObject, listContainer: Element) {
        e.preventDefault();

        /* const item = e.target.firstElementChild.children[0].children[0].dataset.index;
        const project = e.target.firstElementChild.children[0].children[0].dataset.project;

        const todoDate = (document.querySelector('#edit-date')).value;
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;

        todos[project][item].title = (document.querySelector('.edit-name')).value;
        todos[project][item].details = (document.querySelector('.edit-details')).value;
        todos[project][item].dueDate = todoDueDate;
        todos[project][item].priority = (document.querySelector('[name="edit-todo-priority"]:checked')).value;

        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else if (getSelectedProject() === 'today') {
            changeDOM.renderTodayTodos(todos, listContainer);
        } else if (getSelectedProject() === 'week') {
            changeDOM.renderWeekTodos(todos, listContainer);
        } else {
            changeDOM.renderProjectTodos(todos, listContainer);
        } */
    };

    function deleteTodo(e: Event, todos: ProjectsObject, listContainer: Element) {
        /* const item = e.target.parentElement.parentElement.dataset.index;
        const project = e.target.parentElement.parentElement.dataset.project;

        todos[project].splice(item, 1);
        
        if (getSelectedProject() === 'all') {
            changeDOM.renderAllTodos(todos, listContainer);
        } else if (getSelectedProject() === 'today') {
            changeDOM.renderTodayTodos(todos, listContainer);
        } else if (getSelectedProject() === 'week') {
            changeDOM.renderWeekTodos(todos, listContainer);
        } else {
            let projectLength = todos[project].length;

            todos[project].forEach(todo => {
                if (todo.checked) {
                    projectLength--;
                }
            });

            if (projectLength < 1) {
                changeDOM.renderEmptyProject(e, todos, listContainer);
            } else {
                changeDOM.renderProjectTodos(todos, listContainer);
            }
        }

        localStorage.setItem('todos', JSON.stringify(todos));

        changeDOM.renderProjectList(todos, listContainer); */
    };

    return {
        setSelectedProject,
        getSelectedProject,
        createTodo,
        addProject,
        addTodo,
        editTodo,
        deleteTodo
    };
})();