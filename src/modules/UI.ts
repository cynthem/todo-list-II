import { todos } from './todoList';
import displayData from './displayData';
import manageData from './manageData';
import { currentDay } from '../util/dates';

export default (function UI() {
    const contentElement = document.querySelector('.main');
    const contentContainer: Element = contentElement!;
    const listElement = document.querySelector('.main-list');
    const listContainer: Element = listElement!;

    function loadPage() {
        loadDashboard();
        loadTodoList();
    };

    function loadDashboard() {
        toggleDashboard();
        toggleFilters();
        loadProjects();
    };

    function toggleDashboard() {
        const el1 = document.querySelector('.main-dashboard');
        const dashboard: Element = el1!;
        const el2 = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = el2!;
        hamburgerMenu.addEventListener('click', () => {
            console.log('hello');
            (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    };

    function toggleFilters() {
        const filterBtns = document.querySelectorAll('.filters-btn');
        /* filterBtns.forEach(btn => {
            btn.addEventListener('click', e => changeDOM.manageTodosRender(e, todos, listContainer));
        }); */
    };

    function loadProjects() {
        displayData.renderProjectList(todos, listContainer);
        /* projectTitle.addEventListener('click', e => manageTodosRender(e, todos, listContainer));
        projectTitle.addEventListener('click', e => highlightSelectedFilter(e)); */

        handleAddBtn();
        toggleProjects();
        handleEmptyProject();
    };

    function handleAddBtn() {
        /* const addNew = document.querySelector('.projects-btn');
        const addNewCard = document.querySelector('.add-new-card');
        const addExit = document.querySelector('#add-exit');
        const addTodoBtn = document.querySelector('.add-btn-todo');
        const addTodoForm = document.querySelector('.add-todo-form');
        const addProject = document.querySelector('.add-btn-project');
        const addProjectForm = document.querySelector('.add-project-form');
        const addDate = document.getElementById('new-date');
        const addLowPriority = document.getElementById('new-low');
        const addMediumPriority = document.getElementById('new-medium');
        const addHighPriority = document.getElementById('new-high');
        const addLow = document.querySelector('.low');
        const addMedium = document.querySelector('.medium');
        const addHigh = document.querySelector('.high'); */

        /* addNew.addEventListener('click', () => {
            contentContainer.classList.add('blur');
            addNewCard.style.visibility = 'visible';
            addDate.setAttribute('value', currentDay);
        });

        addExit.addEventListener('click', () => {
            addNewCard.style.visibility = 'hidden';
            addNewCard.classList.remove('enter');
            addNewCard.classList.add('exit');
            contentContainer.classList.remove('blur');
            addTodoForm.reset();
            addProjectForm.reset();
            addTodoBtn.classList.add('clicked');
            addTodoForm.style.display = 'grid';
            addProject.classList.remove('clicked');
            addProjectForm.style.display = 'none';
            addDate.removeAttribute('value');
        });

        addTodoBtn.addEventListener('click', () => {
            addTodoBtn.classList.add('clicked');
            addTodoForm.style.display = 'grid';
            addProject.classList.remove('clicked');
            addProjectForm.style.display = 'none';
        });

        addProject.addEventListener('click', () => {
            addProject.classList.add('clicked');
            addProjectForm.style.display = 'grid';
            addTodoBtn.classList.remove('clicked');
            addTodoForm.style.display = 'none';
        });

        addLowPriority.addEventListener('click', () => {
            if (addLow.classList.contains('low')) {
                addLow.classList.remove('low');
                addLow.classList.add('low-checked');
            }
            if (addMedium.classList.contains('medium-checked')) {
                addMedium.classList.remove('medium-checked');
                addMedium.classList.add('medium');
            }
            if (addHigh.classList.contains('high-checked')) {
                addHigh.classList.remove('high-checked');
                addHigh.classList.add('high');
            }
        });

        addMediumPriority.addEventListener('click', () => {
            if (addLow.classList.contains('low-checked')) {
                addLow.classList.remove('low-checked');
                addLow.classList.add('low');
            }
            if (addMedium.classList.contains('medium')) {
                addMedium.classList.remove('medium');
                addMedium.classList.add('medium-checked');
            }
            if (addHigh.classList.contains('high-checked')) {
                addHigh.classList.remove('high-checked');
                addHigh.classList.add('high');
            }
        });

        addHighPriority.addEventListener('click', () => {
            if (addLow.classList.contains('low-checked')) {
                addLow.classList.remove('low-checked');
                addLow.classList.add('low');
            }
            if (addMedium.classList.contains('medium-checked')) {
                addMedium.classList.remove('medium-checked');
                addMedium.classList.add('medium');
            }
            if (addHigh.classList.contains('high')) {
                addHigh.classList.remove('high');
                addHigh.classList.add('high-checked');
            }
        });

        addTodoForm.addEventListener('submit', e => {
            manageData.addTodo(e, todos, listContainer);
            addNewCard.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
            addTodoForm.reset();
            addProjectForm.reset();
            addDate.removeAttribute('value');
        });

        addProjectForm.addEventListener('submit', e => {
            manageData.addProject(e, todos, listContainer);
            addNewCard.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
            addTodoForm.reset();
            addProjectForm.reset();
            addTodoBtn.classList.add('clicked');
            addTodoForm.style.display = 'grid';
            addProject.classList.remove('clicked');
            addProjectForm.style.display = 'none';
            addDate.removeAttribute('value');
        }); */
    };

    function toggleProjects() {};

    function handleEmptyProject() {};

    function loadTodoList() {
        /* displayData.renderAllTodos(todos, listContainer); */
        loadTodoItems();
    };

    function loadTodoItems() {
        handleCheckbox();
        handleNotesBtn();
        handleEditBtn();
        handleDeleteBtn();
    };

    function handleCheckbox() {};

    function handleNotesBtn() {
        /* const notesCard = document.querySelector('.notes-card');
        const notesExit = document.querySelector('#notes-exit'); */

        /* notesExit.addEventListener('click', () => {
            notesCard.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
        }); */
    };

    function handleEditBtn() {
        /* const editCard = document.querySelector('.edit-card');
        const editExit = document.querySelector('#edit-exit');
        const editSubmit = document.querySelector('.edit-form'); */
        
        /* editExit.addEventListener('click', () => {
            editCard.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
        });

        editSubmit.addEventListener('submit', e => {
            manageData.editTodo(e, todos, listContainer);
            editCard.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
        }); */
    };

    function handleDeleteBtn() {};

    return { loadPage };
})();