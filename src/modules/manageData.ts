import { TodoObject, ProjectsObject } from "../util/types";

export default (function manageData() {
    let selectedProject = 'all';

    function setSelectedProject(currentProject: string) {
        selectedProject = currentProject;
    };

    function getSelectedProject() {
        return selectedProject;
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
        } */
        storeTodos(todos);
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
                    }
                }
            }
        }
    };

    function deleteTodo(e: Event, todos: ProjectsObject, listContainer: Element) {
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
                }
            }
        }

        /* 

        
        
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

    function toggleTodosRender(e: Event, todos: ProjectsObject, listContainer: Element) {
        if ((e.target as Element).textContent === 'All') {
            setSelectedProject('all');
            //displayData.renderAllTodos(todos, listContainer);
            //displayData.highlightSelectedFilter(e);
        } else if ((e.target as Element).textContent === 'Today') {
            setSelectedProject('today');
            //displayData.renderTodayTodos(todos, listContainer);
            //displayData.highlightSelectedFilter(e);
        } else if ((e.target as Element).textContent === 'This week') {
            setSelectedProject('week');
            //displayData.renderWeekTodos(todos, listContainer);
            //displayData.highlightSelectedFilter(e);
        } else {
            setSelectedProject((e.target as Element).textContent!);
            let projectLength = todos[getSelectedProject()].length;
            todos[getSelectedProject()].forEach(todo => {
                if (todo.checked) {
                    projectLength--;
                }
            });
            /*if (projectLength < 1) {
                displayData.renderEmptyProject(e, todos, listContainer);
            } else {
                displayData.renderProjectTodos(todos, listContainer);
                displayData.highlightSelectedFilter(e);
            }*/
        }
    };

    function manageTodosRender() {};

    function storeTodos(todos: ProjectsObject) {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    return {
        setSelectedProject,
        getSelectedProject,
        createTodo,
        addProject,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodosRender,
        manageTodosRender,
        storeTodos
    };
})();