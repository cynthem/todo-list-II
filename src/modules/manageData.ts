import displayData from "./displayData";
import { TodoObject, ProjectsObject } from "../util/types";

export default (function manageData() {
    let selectedProject = 'all';

    function setSelectedProject(todos: ProjectsObject, currentProject: string) {
        selectedProject = currentProject;
        updateTodos(todos);
    };

    function getSelectedProject() {
        return selectedProject;
    };

    function addProject(e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const newProject = (document.querySelector('#add-project') as HTMLInputElement).value;

        if (newProject) {
            if (
                (newProject.toLowerCase() === 'all') ||
                (newProject.toLowerCase() === 'today') ||
                (newProject.toLowerCase() === 'week') ||
                (newProject.toLowerCase() === 'this week') ||
                (newProject in todos)
            ) {
                return;
            } else {
                todos[newProject] = [];
                updateTodos(todos);
            }
        }
    };

    function deleteProject(todos: ProjectsObject) {
        delete todos[getSelectedProject()];
        setSelectedProject(todos, 'all');
    };

    function addProjectTodo(e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const todoTitle = (document.querySelector('.add-new-todo-input') as HTMLInputElement).value;
        const todoDetails = (document.querySelector('.add-new-todo-textarea') as HTMLTextAreaElement).value;
        const todoDate = (document.querySelector('.add-new-date-input') as HTMLInputElement).value;
        const todoPriority = (document.querySelector('[name="new-todo-priority"]:checked') as HTMLInputElement).value;
        const todoProject = getSelectedProject();
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;

        const newTodo = createTodo(todoTitle, todoDetails, todoDueDate, todoPriority, todoProject);
        todos[todoProject].push(newTodo);
        updateTodos(todos);
    };

    function createTodo(title: string, details: string, dueDate: string, priority: string, project: string, checked: boolean = false) {
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
        updateTodos(todos);
    };

    function checkOffTodo(index: number, projectName: string, todos: ProjectsObject) {
        todos[projectName][index].checked = !todos[projectName][index].checked;
        updateTodos(todos);
    };

    function editTodo(index: number, projectName: string, e: Event, todos: ProjectsObject) {
        e.preventDefault();

        const todoDate = (document.querySelector('#edit-date') as HTMLInputElement).value;
        const todoDay = todoDate.slice(5, 10);
        const todoYear = todoDate.slice(0, 4);
        const todoDueDate = `${todoDay}-${todoYear}`;

        todos[projectName][index].title = (document.querySelector('.edit-title-textarea') as HTMLTextAreaElement).value;
        todos[projectName][index].details = (document.querySelector('.edit-details-textarea') as HTMLTextAreaElement).value;
        todos[projectName][index].dueDate = todoDueDate;
        todos[projectName][index].priority = (document.querySelector('[name="edit-todo-priority"]:checked') as HTMLInputElement).value;
        
        updateTodos(todos);

        /*let item: number;
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
                    }
                }
            }
        }*/
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
                    updateTodos(todos);
                }
            }
        }
    };

    function updateTodos(todos: ProjectsObject) {
        localStorage.setItem('todos', JSON.stringify(todos));
        manageRerender(todos);
    };

    function manageRerender(todos: ProjectsObject) {
        const project = getSelectedProject();

        if (project === 'all') {
            displayData.renderFilterList(todos);
            displayData.renderProjectList(todos);
            displayData.renderHighlightedCategory();
            displayData.renderAllTodos(todos);
        } else if (project === 'today') {
            displayData.renderFilterList(todos);
            displayData.renderProjectList(todos);
            displayData.renderHighlightedCategory();
            displayData.renderTodayTodos(todos);
        } else if (project === 'week') {
            displayData.renderFilterList(todos);
            displayData.renderProjectList(todos);
            displayData.renderHighlightedCategory();
            displayData.renderWeekTodos(todos);
        } else {
            let projectLength = todos[project].length;

            todos[project].forEach(todo => {
                if (todo.checked) {
                    projectLength--;
                }
            });

            if (projectLength < 1) {
                displayData.renderHighlightedCategory();
                displayData.renderEmptyProjectPopup(todos);
            } else {
                displayData.renderFilterList(todos);
                displayData.renderProjectList(todos);
                displayData.renderHighlightedCategory();
                displayData.renderProjectTodos(todos);
            }
        }
    };

    return {
        setSelectedProject,
        getSelectedProject,
        addProject,
        deleteProject,
        addProjectTodo,
        createTodo,
        addTodo,
        checkOffTodo,
        editTodo,
        deleteTodo,
        updateTodos,
        manageRerender
    };
})();