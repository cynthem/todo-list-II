import { todos } from './todoList';
import displayData from './displayData';
import manageData from './manageData';
import { ProjectsObject } from '../util/types';
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
        loadFilters();
        loadProjects();
        toggleDashboard();
    };

    function loadFilters() {
        displayData.renderFilters(todos);
        toggleFilters();
    };

    function toggleFilters() {
        const filterEl = document.querySelectorAll('.filters-btn');
        const filterBtns: NodeListOf<Element> = filterEl!;
        filterBtns.forEach(btn => {
            btn.addEventListener('click', e => manageData.manageTodosRender(e, todos, listContainer));
        });
    };

    function loadProjects() {
        displayData.renderProjectList(todos);
        handleAddBtn();
        toggleProjects();
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

    function toggleProjects() {
        const projectEl = document.querySelectorAll('.project-name');
        const projectTitle: NodeListOf<Element> = projectEl!;
        projectTitle.forEach(project => {
            project.addEventListener('click', e => manageData.manageTodosRender(e, todos, listContainer));
        });
        projectTitle.forEach(project => {
            project.addEventListener('click', e => displayData.renderHighlightedFilters(e));
        });
        handleEmptyProject();
    };

    function handleEmptyProject() {};

    function loadTodoList() {
        displayData.renderAllTodos(todos, listContainer);
        loadTodoItems();
    };

    function loadTodoItems() {
        toggleCheckbox();
        handleNotesBtn();
        handleEditBtn();
        handleDeleteBtn();
    };

    function toggleCheckbox() {
        const checkboxEl = document.querySelectorAll('fa-square');
        const checkboxIcon: NodeListOf<Element> = checkboxEl!; 
        checkboxIcon.forEach(box => {
            box.addEventListener('click', e => displayData.toggleCheckedTodo(e, todos, listContainer));
        });
    };

    function handleNotesBtn() {
        const notesBtnEl = document.querySelectorAll('.item-notes');
        const notesBtn: NodeListOf<Element> = notesBtnEl!;
        const notesEl = document.querySelector('.popup-notes');
        const notesCard: Element = notesEl!;
        const notesCloseEl = document.querySelector('.notes-close');
        const notesClose: Element = notesCloseEl!;
        
        notesBtn.forEach(btn => {
            btn.addEventListener('click', () => notesCard.classList.remove('invisible-notes'));
        });

        notesClose.addEventListener('click', () => notesCard.classList.add('invisible-notes'));
    };

    function handleEditBtn() {
        const editBtnEl = document.querySelectorAll('.fa-pen-to-square');
        const editBtn: NodeListOf<Element> = editBtnEl!;
        const editEl = document.querySelector('.popup-edit');
        const editCard: Element = editEl!;
        const editCloseEl = document.querySelector('.edit-close');
        const editClose: Element = editCloseEl!;
        const editSubmitEl = document.querySelector('.edit-form');
        const editSubmit: Element = editSubmitEl!;
        
        editBtn.forEach(btn => {
            btn.addEventListener('click', () => editCard.classList.remove('invisible-edit'));
        });

        editClose.addEventListener('click', () => {
            editCard.classList.add('invisible-edit');
        });
        
        /* 
        editSubmit.addEventListener('submit', e => {
            manageData.editTodo(e, todos, listContainer);
        }); */
    };

    function handleDeleteBtn() {};

    function toggleDashboard() {
        const dashboardEl = document.querySelector('.main-dashboard');
        const dashboard: Element = dashboardEl!;
        const hamburgerEl = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = hamburgerEl!;
        hamburgerMenu.addEventListener('click', () => {
            console.log('hello');
            (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    };

    return { loadPage };
})();