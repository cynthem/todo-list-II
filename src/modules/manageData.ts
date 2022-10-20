import displayData from "./displayData";
import { TodoObject, ProjectsObject } from "../util/types";

export default (function manageData() {
    let selectedProject = 'all';

    function setSelectedProject(currentProject: string) {
        selectedProject = currentProject;
        displayData.renderHighlightedFilters(selectedProject);
    };

    function getSelectedProject() {
        return selectedProject;
    };

    function addProject(e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const newProject = (document.querySelector('#add-project') as HTMLInputElement).value;

        if (newProject) {
            if (newProject.toLowerCase() === 'all') {
                storeTodos(todos);
                setSelectedProject('all');
                displayData.renderAllTodos(todos);
            } else if (newProject.toLowerCase() === 'today') {
                storeTodos(todos);
                setSelectedProject('today');
                displayData.renderTodayTodos(todos);
            } else if ((newProject.toLowerCase() === 'week') || (newProject.toLowerCase() === 'this week')) {
                storeTodos(todos);
                setSelectedProject('week');
                displayData.renderWeekTodos(todos);
            } else if (newProject in todos) {
                storeTodos(todos);
                setSelectedProject(newProject);
                displayData.renderProjectTodos(todos);
            } else {
                todos[newProject] = [];
                storeTodos(todos);
                displayData.renderFilterCounts(todos);
                displayData.renderProjectList(todos);
            }
        }
    };

    function deleteProject(todos: ProjectsObject) {
        delete todos[getSelectedProject()];
        storeTodos(todos);
        setSelectedProject('all');
        displayData.renderFilterCounts(todos);
        displayData.renderProjectList(todos);
        displayData.renderAllTodos(todos);
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

    function addTodo(e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const todoTitle = (document.querySelector('.add-todo-input') as HTMLInputElement).value;
        const todoDetails = (document.querySelector('.add-todo-textarea') as HTMLTextAreaElement).value;
        const todoDate = (document.querySelector('#new-date') as HTMLInputElement).value;
        const todoPriority = (document.querySelector('[name="new-priority"]:checked') as HTMLInputElement).value;
        const todoProject = getSelectedProject();
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todos[todoProject].push(newTodo);

        storeTodos(todos);
        displayData.renderFilterCounts(todos);
        displayData.renderProjectList(todos);
        manageTodosRender(todos);
    };

    function checkOffTodo(index: number, projectName: string, todos: ProjectsObject) {
        todos[projectName][index].checked = todos[projectName][index].checked;

        storeTodos(todos);
        displayData.renderFilterCounts(todos);
        displayData.renderProjectList(todos);
    };

    function editTodo(e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const todoDate = (document.querySelector('#edit-date') as HTMLInputElement).value;
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;

        let item: number;
        let project: string;
        const target = e.target;

        if (target instanceof HTMLElement) {
            const itemChild = target.firstElementChild;
            if (itemChild instanceof HTMLElement) {
                const itemGrandchild = itemChild.children[0];
                if (itemGrandchild instanceof HTMLElement) {
                    const itemGreatGrand = itemGrandchild.children[0];
                    if (itemGreatGrand instanceof HTMLElement) {
                        item = Number(itemGreatGrand.dataset.index);
                        project = itemGreatGrand.dataset.project!;

                        todos[project][item].title = (document.querySelector('.edit-title-textarea') as HTMLTextAreaElement).value;
                        todos[project][item].details = (document.querySelector('.edit-details-textarea') as HTMLTextAreaElement).value;
                        todos[project][item].dueDate = todoDueDate;
                        todos[project][item].priority = (document.querySelector('[name="edit-todo-priority"]:checked') as HTMLInputElement).value;
                        
                        storeTodos(todos);
                        manageTodosRender(todos);
                    }
                }
            }
        }
    };

    function deleteTodo(e: Event, todos: ProjectsObject) {
        let item: number;
        let project: string;
        const target = e.target;

        if (target instanceof HTMLElement) {
            const itemParent = target.parentElement;
            if (itemParent instanceof HTMLElement) {
                const itemGrandparent = itemParent.parentElement;
                if (itemGrandparent instanceof HTMLElement) {
                    item = Number(itemGrandparent.dataset.index);
                    project = itemGrandparent.dataset.project!;
                    todos[project].splice(item, 1);

                    storeTodos(todos);
                    manageTodosRender(todos);
                    displayData.renderFilterCounts(todos);
                    displayData.renderProjectList(todos);
                }
            }
        }
    };

    function manageTodosRender(todos: ProjectsObject, e?: Event) {
        if (e) {
            const project = (e.target as Element).textContent!;
            if (project === 'All') {
                setSelectedProject('all');
                displayData.renderAllTodos(todos);
            } else if (project === 'Today') {
                setSelectedProject('today');
                displayData.renderTodayTodos(todos);
            } else if (project === 'This week') {
                setSelectedProject('week');
                displayData.renderWeekTodos(todos);
            } else {
                setSelectedProject(project);
                let projectLength = todos[project].length;
                todos[project].forEach(todo => {
                    if (todo.checked) {
                        projectLength--;
                    }
                });

                if (projectLength < 1) {
                    displayData.renderEmptyProjectPopup();
                } else {
                    displayData.renderProjectTodos(todos);
                }
            }

        } else if (!e) {
            if (getSelectedProject() === 'all') {
                displayData.renderAllTodos(todos);
            } else if (getSelectedProject() === 'today') {
                displayData.renderTodayTodos(todos);
            } else if (getSelectedProject() === 'week') {
                displayData.renderWeekTodos(todos);
            } else {
                displayData.renderProjectTodos(todos);
            }
        }
    };

    function storeTodos(todos: ProjectsObject) {
        localStorage.setItem('todos', JSON.stringify(todos));
        displayData.reloadContent(todos);
    };

    return {
        setSelectedProject,
        getSelectedProject,
        addProject,
        deleteProject,
        createTodo,
        addTodo,
        checkOffTodo,
        editTodo,
        deleteTodo,
        manageTodosRender,
        storeTodos
    };
})();