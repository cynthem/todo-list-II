import { todos } from './todoList';
import displayData from './displayData';
import manageData from './manageData';
import { ProjectsObject } from '../util/types';
import { currentDay } from '../util/dates';

export default (function UI() {
    const listContainerEl = document.querySelector('.main-list');
    const listContainer: Element = listContainerEl!;

    function loadPage() {
        loadDashboard();
        loadTodoList();
    };

    function loadDashboard() {
        loadFilters();
        loadProjects();
        toggleDashboard();
    };

    function loadTodoList() {
        displayData.renderAllTodos(todos, listContainer);
        loadTodoItems();
    };

    function loadFilters() {
        displayData.renderFilterCounts(todos);
        toggleFilters();
    };

    function loadProjects() {
        displayData.renderProjectList(todos);
        toggleProjects();
        toggleAddBtn();
    };

    function toggleDashboard() {
        const dashboardEl = document.querySelector('.main-dashboard');
        const dashboard: Element = dashboardEl!;
        const hamburgerEl = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = hamburgerEl!;

        hamburgerMenu.addEventListener('click', () => (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden');
    };

    function loadTodoItems() {
        toggleCheckbox();
        toggleNotesBtn();
        toggleEditBtn();
        handleDeleteBtn();
    };

    function toggleFilters() {
        const filterEl = document.querySelectorAll('.filters-btn');
        const filterBtns: NodeListOf<Element> = filterEl!;
        filterBtns.forEach(btn => {
            btn.addEventListener('click', e => manageData.toggleTodosRender(e, todos, listContainer));
        });
    };

    function toggleProjects() {
        const projectEl = document.querySelectorAll('.project-name');
        const projectTitle: NodeListOf<Element> = projectEl!;
        projectTitle.forEach(project => {
            project.addEventListener('click', e => manageData.toggleTodosRender(e, todos, listContainer));
        });
        // if project has no todo items then do this instead of toggleTodosRender:
        handleEmptyProject();
    };

    function toggleAddBtn() {
        handleAddBtn();
    };

    function toggleCheckbox() {
        const checkboxEl = document.querySelectorAll('fa-square');
        const checkboxIcon: NodeListOf<Element> = checkboxEl!; 
        checkboxIcon.forEach(box => {
            box.addEventListener('click', e => displayData.renderCheckedTodo(e, todos));
        });
    };

    function toggleNotesBtn() {
        const notesBtnEl = document.querySelectorAll('.item-notes');
        const notesBtn: NodeListOf<Element> = notesBtnEl!;
        const notesEl = document.querySelector('.popup-notes');
        const notesCard: Element = notesEl!;
        const notesCloseEl = document.querySelector('.notes-close');
        const notesClose: Element = notesCloseEl!;
        
        notesBtn.forEach(btn => {
            btn.addEventListener('click', e => displayData.renderNotesPopup(e, todos));
            notesClose.addEventListener('click', () => notesCard.classList.add('invisible-notes'));
        });
    };

    function toggleEditBtn() {
        const editBtnEl = document.querySelectorAll('.fa-pen-to-square');
        const editBtn: NodeListOf<Element> = editBtnEl!;
        
        editBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                displayData.renderEditPopup(e, todos);
                handleEditForm();
            });
        });
    };

    function handleDeleteBtn() {
        const deleteBtnEl = document.querySelectorAll('.fa-trash-can');
        const deleteBtn: NodeListOf<Element> = deleteBtnEl!;

        deleteBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                manageData.deleteTodo(e, todos, listContainer);
            });
        });
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

    function handleEmptyProject() {};

    function handleEditForm() {
        const editEl = document.querySelector('.popup-edit');
        const editCard: Element = editEl!;
        const editCloseEl = document.querySelector('.edit-close');
        const editClose: Element = editCloseEl!;
        const editSubmitEl = document.querySelector('.edit-form');
        const editSubmit: Element = editSubmitEl!;
        const editLowEl = document.getElementById('edit-low');
        const editLowPriority: Element = editLowEl!;
        const editMediumEl = document.getElementById('edit-medium');
        const editMediumPriority: Element = editMediumEl!;
        const editHighEl = document.getElementById('edit-high');
        const editHighPriority: Element = editHighEl!;
        const editLowLabelEl = document.getElementById('edit-low-label');
        const editLowLabel: Element = editLowLabelEl!;
        const editMediumLabelEl = document.getElementById('edit-medium-label');
        const editMediumLabel: Element = editMediumLabelEl!;
        const editHighLabelEl = document.getElementById('edit-high-label');
        const editHighLabel: Element = editHighLabelEl!;

        editClose.addEventListener('click', () => editCard.classList.add('invisible-edit'));
        
        editSubmit.addEventListener('submit', e => {
            editCard.classList.add('invisible-edit');
            manageData.editTodo(e, todos, listContainer);
            
        });

        editLowPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low')) {
                editLowLabel.classList.remove('low');
                editLowLabel.classList.add('low-checked');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });

        editMediumPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium')) {
                editMediumLabel.classList.remove('medium');
                editMediumLabel.classList.add('medium-checked');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });

        editHighPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high')) {
                editHighLabel.classList.remove('high');
                editHighLabel.classList.add('high-checked');
            }
        });
    };

    return { loadPage };
})();