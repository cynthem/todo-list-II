import displayData from './displayData';
import manageData from './manageData';
import { todos } from './todoList';
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
            btn.addEventListener('click', e => manageData.manageTodosRender(todos, listContainer, e));
        });
    };

    function toggleProjects() {
        const projectEl = document.querySelectorAll('.project-name');
        const projectTitle: NodeListOf<Element> = projectEl!;

        projectTitle.forEach(project => {
            
            project.addEventListener('click', e => {
                

                manageData.manageTodosRender(todos, listContainer, e);
            });
        });
        // if project has no todo items then do this instead of toggleTodosRender:
        handleEmptyProject();
    };

    function toggleAddBtn() {
        const addNewEl = document.querySelector('.projects-btn');
        const addNewBtn: Element = addNewEl!;
        const addNewPopupEl = document.querySelector('.popup-add-new');
        const addNewPopup: Element = addNewPopupEl!;
        const addDateEl = <HTMLInputElement>document.getElementById('new-date');
        const addDate: HTMLInputElement = addDateEl!;

        addNewBtn.addEventListener('click', () => {
            addDate.setAttribute('value', currentDay);
            addNewPopup.classList.remove('invisible-add-new');
            handleAddForm();
        });
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

    function handleAddForm() {
        const addNewPopupEl = document.querySelector('.popup-add-new');
        const addNewPopup: Element = addNewPopupEl!;
        const addNewCloseEl = document.querySelector('#add-exit');
        const addNewClose: Element = addNewCloseEl!;
        const addTodoFormEl = <HTMLFormElement>document.querySelector('.add-todo-form');
        const addTodoForm: HTMLFormElement = addTodoFormEl!;
        const addProjectFormEl = <HTMLFormElement>document.querySelector('.add-project-form');
        const addProjectForm: HTMLFormElement = addProjectFormEl!;
        const addTodoBtnEl = document.querySelector('.add-todo-btn');
        const addTodoBtn: Element = addTodoBtnEl!;
        const addProjectBtnEl = document.querySelector('.add-project-btn');
        const addProjectBtn: Element = addProjectBtnEl!;
        const addDateEl = document.getElementById('new-date');
        const addDate: Element = addDateEl!;
        const addLowPriorityEl = document.getElementById('new-low');
        const addLowPriority: Element = addLowPriorityEl!;
        const addMediumPriorityEl = document.getElementById('new-medium');
        const addMediumPriority: Element = addMediumPriorityEl!;
        const addHighPriorityEl = document.getElementById('new-high');
        const addHighPriority: Element = addHighPriorityEl!;
        const addLowLabelEl = document.querySelector('.low');
        const addLowLabel: Element = addLowLabelEl!;
        const addMediumLabelEl = document.querySelector('.medium');
        const addMediumLabel: Element = addMediumLabelEl!;
        const addHighLabelEl = document.querySelector('.high');
        const addHighLabel: Element = addHighLabelEl!;

        addNewClose.addEventListener('click', () => {
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });

        addTodoForm.addEventListener('submit', e => {
            manageData.addTodo(e, todos, listContainer);
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });

        addProjectForm.addEventListener('submit', e => {
            manageData.addProject(e, todos, listContainer);
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });

        addTodoBtn.addEventListener('click', () => {
            addTodoBtn.classList.add('clicked');
            addTodoForm.style.display = 'grid';
            addProjectBtn.classList.remove('clicked');
            addProjectForm.style.display = 'none';
        });

        addProjectBtn.addEventListener('click', () => {
            addProjectBtn.classList.add('clicked');
            addProjectForm.style.display = 'grid';
            addTodoBtn.classList.remove('clicked');
            addTodoForm.style.display = 'none';
        });

        addLowPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low')) {
                addLowLabel.classList.remove('low');
                addLowLabel.classList.add('low-checked');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high');
            }
        });

        addMediumPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low');
            }
            if (addMediumLabel.classList.contains('medium')) {
                addMediumLabel.classList.remove('medium');
                addMediumLabel.classList.add('medium-checked');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high');
            }
        });

        addHighPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium');
            }
            if (addHighLabel.classList.contains('high')) {
                addHighLabel.classList.remove('high');
                addHighLabel.classList.add('high-checked');
            }
        });
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