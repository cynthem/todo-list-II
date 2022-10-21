import displayData from './displayData';
import manageData from './manageData';
import { todos } from './todoList';

export default (function UI() {

    function loadPage() {
        loadDashboard();
        loadTodoList();
    };

    function loadDashboard() {
        toggleDashboard();
        loadFilters();
        loadProjects();
    };

    function toggleDashboard() {
        const dashboardEl = document.querySelector('.main-dashboard');
        const dashboard: Element = dashboardEl!;
        const hamburgerEl = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = hamburgerEl!;

        hamburgerMenu.addEventListener('click', () => (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden');
    };

    function loadFilters() {
        displayData.renderHighlightedFilters('all');
        displayData.renderFilterCounts(todos);
        toggleFilters();
    };

    function toggleFilters() {
        const filterEl = document.querySelectorAll('.filters-btn');
        const filterBtns: NodeListOf<Element> = filterEl!;
        filterBtns.forEach(btn => {
            btn.addEventListener('click', e => manageData.manageTodosRender(todos, e));
        });
    };

    function loadProjects() {
        displayData.renderProjectList(todos);
        toggleProjects();
        toggleAddBtn();
    };

    function toggleProjects() {
        const projectEl = document.querySelectorAll('.project-name');
        const projectTitle: NodeListOf<Element> = projectEl!;

        projectTitle.forEach(project => {
            project.addEventListener('click', e => manageData.manageTodosRender(todos, e));
            handleEmptyProject();
        });
    };

    function handleEmptyProject() {
        const emptyPopupEl = document.querySelector('.popup-empty-project');
        const emptyPopup: Element = emptyPopupEl!;
        const emptyAddBtnEl = document.querySelector('.empty-project-add-btn');
        const emptyAddBtn: Element = emptyAddBtnEl!;
        const emptyDeleteBtnEl = document.querySelector('.empty-project-delete-btn');
        const emptyDeleteBtn: Element = emptyDeleteBtnEl!;

        emptyAddBtn.addEventListener('click', () => {
            displayData.renderAddTodoPopup();
            handleAddTodoForm();
        });

        emptyDeleteBtn.addEventListener('click', () => {
            manageData.deleteProject(todos);
            emptyPopup.classList.add('invisible-empty-project');
        });
    };

    function handleAddTodoForm() {
        const addTodoPopupEl = document.querySelector('.popup-add-new-todo');
        const addTodoPopup: Element = addTodoPopupEl!;
        const addTodoFormEl = <HTMLFormElement>document.querySelector('.add-new-todo-form');
        const addTodoForm: HTMLFormElement = addTodoFormEl!;
        const addTodoDeleteEl = document.querySelector('.add-new-delete-project');
        const addTodoDelete: Element = addTodoDeleteEl!;
        const addDateEl = <HTMLInputElement>document.querySelector('.add-new-date-input');
        const addDate: HTMLInputElement = addDateEl!;
        const addLowPriorityEl = <HTMLInputElement>document.getElementById('new-todo-low');
        const addLowPriority: HTMLInputElement = addLowPriorityEl!;
        const addMediumPriorityEl = <HTMLInputElement>document.getElementById('new-todo-medium');
        const addMediumPriority: HTMLInputElement = addMediumPriorityEl!;
        const addHighPriorityEl = <HTMLInputElement>document.getElementById('new-todo-high');
        const addHighPriority: HTMLInputElement = addHighPriorityEl!;
        const addLowLabelEl = <HTMLLabelElement>document.querySelector('.low');
        const addLowLabel: HTMLLabelElement = addLowLabelEl!;
        const addMediumLabelEl = <HTMLLabelElement>document.querySelector('.medium');
        const addMediumLabel: HTMLLabelElement = addMediumLabelEl!;
        const addHighLabelEl = <HTMLLabelElement>document.querySelector('.high');
        const addHighLabel: HTMLLabelElement = addHighLabelEl!;

        addTodoForm.addEventListener('submit', e => {
            manageData.addProjectTodo(e, todos);
            addTodoPopup.classList.add('invisible-add-new-todo');
            addTodoForm.reset();
            addDate.removeAttribute('value');
        });

        addTodoDelete.addEventListener('click', () => {
            manageData.deleteProject(todos);
            addTodoPopup.classList.add('invisible-add-new-todo');
            addTodoForm.reset();
            addDate.removeAttribute('value');
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

    function toggleAddBtn() {
        const addNewEl = document.querySelector('.projects-btn');
        const addNewBtn: Element = addNewEl!;
        addNewBtn.addEventListener('click', () => {
            displayData.renderAddNewPopup();
            handleAddForm();
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
        const addDateEl = <HTMLInputElement>document.getElementById('new-date');
        const addDate: HTMLInputElement = addDateEl!;
        const addLowPriorityEl = <HTMLInputElement>document.getElementById('new-low');
        const addLowPriority: HTMLInputElement = addLowPriorityEl!;
        const addMediumPriorityEl = <HTMLInputElement>document.getElementById('new-medium');
        const addMediumPriority: HTMLInputElement = addMediumPriorityEl!;
        const addHighPriorityEl = <HTMLInputElement>document.getElementById('new-high');
        const addHighPriority: HTMLInputElement = addHighPriorityEl!;
        const addLowLabelEl = <HTMLLabelElement>document.querySelector('.low');
        const addLowLabel: HTMLLabelElement = addLowLabelEl!;
        const addMediumLabelEl = <HTMLLabelElement>document.querySelector('.medium');
        const addMediumLabel: HTMLLabelElement = addMediumLabelEl!;
        const addHighLabelEl = <HTMLLabelElement>document.querySelector('.high');
        const addHighLabel: HTMLLabelElement = addHighLabelEl!;

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
            manageData.addTodo(e, todos);
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
            manageData.addProject(e, todos);
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

    function loadTodoList() {
        displayData.renderAllTodos(todos);
        loadTodoItems();
    };

    function loadTodoItems() {
        toggleCheckbox();
        toggleNotesBtn();
        toggleEditBtn();
        toggleDeleteBtn();
    };

    function toggleCheckbox() {
        const checkboxEl = document.querySelectorAll('.fa-square');
        const checkboxIcon: NodeListOf<Element> = checkboxEl!; 
        checkboxIcon.forEach(box => {
            box.addEventListener('click', e => {
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
                            manageData.checkOffTodo(item, project, todos);
                        }
                    }
                }
            });
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

                            displayData.renderEditPopup(item, project, todos);
                            handleEditForm(item, project);
                        }
                    }
                }
            });
        });
    };

    function handleEditForm(index: number, projectName: string) {
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
            manageData.editTodo(index, projectName, e, todos);
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

    function toggleDeleteBtn() {
        const deleteBtnEl = document.querySelectorAll('.fa-trash-can');
        const deleteBtn: NodeListOf<Element> = deleteBtnEl!;
        const deletePopupEl = document.querySelector('.popup-delete-todo');
        const deletePopup: Element = deletePopupEl!;

        deleteBtn.forEach(btn => {
            btn.addEventListener('click', e => {
                deletePopup.classList.remove('invisible-delete-todo');
                handleDeleteBtn(e);
            });
        });
    };

    function handleDeleteBtn(e: Event) {
        const deletePopupEl = document.querySelector('.popup-delete-todo');
        const deletePopup: Element = deletePopupEl!;
        const deleteConfirmEl = document.querySelector('.delete-todo-confirm-btn');
        const deleteConfirm: Element = deleteConfirmEl!;
        const deleteCancelEl = document.querySelector('.delete-todo-cancel-btn');
        const deleteCancel: Element = deleteCancelEl!;

        deleteConfirm.addEventListener('click', () => {
            manageData.deleteTodo(e, todos);
            deletePopup.classList.add('invisible-delete-todo');
        });

        deleteCancel.addEventListener('click', () => deletePopup.classList.add('invisible-delete-todo'));
    };

    return { loadPage };
})();