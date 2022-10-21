import displayData from './modules/displayData';
import manageData from './modules/manageData';
import { todos } from './modules/todoList';
import { ProjectsObject } from './util/types';
import './index.css';

function initialLoad(todos: ProjectsObject) {
    displayData.renderFilterList(todos);
    displayData.renderProjectList(todos);
    displayData.renderHighlightedCategory();
    displayData.renderAllTodos(todos);
};

initialLoad(todos);

export function reload() {

};

// Dashboard 
const dashboardEl = document.querySelector('.main-dashboard');
const dashboard: Element = dashboardEl!;
const hamburgerEl = document.querySelector('.fa-bars');
const hamburgerMenu: Element = hamburgerEl!;
const filterEl = document.querySelectorAll('.filters-btn');
const filterBtns: NodeListOf<Element> = filterEl!;
const projectEl = document.querySelectorAll('.project-name');
const projectBtns: NodeListOf<Element> = projectEl!;
// Popup: Empty Project
const emptyPopupEl = document.querySelector('.popup-empty-project');
const emptyPopup: Element = emptyPopupEl!;
const emptyAddBtnEl = document.querySelector('.empty-project-add-btn');
const emptyAddBtn: Element = emptyAddBtnEl!;
const emptyDeleteBtnEl = document.querySelector('.empty-project-delete-btn');
const emptyDeleteBtn: Element = emptyDeleteBtnEl!;
// Popup: Add Todo to Empty Project
const addTodoPopupEl = document.querySelector('.popup-add-new-todo');
const addTodoPopup: Element = addTodoPopupEl!;
const addNewFormEl = <HTMLFormElement>document.querySelector('.add-new-todo-form');
const addNewForm: HTMLFormElement = addNewFormEl!;
const addTodoDeleteEl = document.querySelector('.add-new-delete-project');
const addTodoDelete: Element = addTodoDeleteEl!;
const addNewDateEl = <HTMLInputElement>document.querySelector('.add-new-date-input');
const addNewDate: HTMLInputElement = addNewDateEl!;
const addNewLowPriorityEl = <HTMLInputElement>document.getElementById('new-todo-low');
const addNewLowPriority: HTMLInputElement = addNewLowPriorityEl!;
const addNewMediumPriorityEl = <HTMLInputElement>document.getElementById('new-todo-medium');
const addNewMediumPriority: HTMLInputElement = addNewMediumPriorityEl!;
const addNewHighPriorityEl = <HTMLInputElement>document.getElementById('new-todo-high');
const addNewHighPriority: HTMLInputElement = addNewHighPriorityEl!;
// Popup: Add New Todo or Project
const addNewEl = document.querySelector('.projects-btn');
const addNewBtn: Element = addNewEl!;
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
// Priority labels for both add forms
const addLowLabelEl = <HTMLLabelElement>document.querySelector('.low');
const addLowLabel: HTMLLabelElement = addLowLabelEl!;
const addMediumLabelEl = <HTMLLabelElement>document.querySelector('.medium');
const addMediumLabel: HTMLLabelElement = addMediumLabelEl!;
const addHighLabelEl = <HTMLLabelElement>document.querySelector('.high');
const addHighLabel: HTMLLabelElement = addHighLabelEl!;
// Todo Item Checkbox
const checkboxEl = document.querySelectorAll('.fa-square');
const checkboxIcon: NodeListOf<Element> = checkboxEl!; 
const uncheckboxEl = document.querySelectorAll('.fa-square-check');
const uncheckboxIcon: NodeListOf<Element> = uncheckboxEl!; 
// Popup: Notes
const notesBtnEl = document.querySelectorAll('.item-notes');
const notesBtn: NodeListOf<Element> = notesBtnEl!;
const notesEl = document.querySelector('.popup-notes');
const notesCard: Element = notesEl!;
const notesCloseEl = document.querySelector('.notes-close');
const notesClose: Element = notesCloseEl!;
// Popup: Edit Todo
const editBtnEl = document.querySelectorAll('.fa-pen-to-square');
const editBtn: NodeListOf<Element> = editBtnEl!;
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
// Popup: Delete Todo
const deleteBtnEl = document.querySelectorAll('.fa-trash-can');
const deleteBtn: NodeListOf<Element> = deleteBtnEl!;
const deletePopupEl = document.querySelector('.popup-delete-todo');
const deletePopup: Element = deletePopupEl!;
const deleteConfirmEl = document.querySelector('.delete-todo-confirm-btn');
const deleteConfirm: Element = deleteConfirmEl!;
const deleteCancelEl = document.querySelector('.delete-todo-cancel-btn');
const deleteCancel: Element = deleteCancelEl!;

hamburgerMenu.addEventListener('click', () => {
    (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
});

// Dashboard buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        let projectName: string;
        projectName = (e.target as Element).textContent!;

        if (projectName === 'All') {
            projectName = 'all';
        } else if (projectName === 'Today') {
            projectName = 'today';
        } else {
            projectName = 'week';
        }

        manageData.setSelectedProject(todos, projectName);
    });
});

projectBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const projectName = (e.target as Element).textContent!;
        manageData.setSelectedProject(todos, projectName);
    });
});

// Popup: Empty Project
emptyAddBtn.addEventListener('click', () => {
    displayData.renderAddTodoPopup();
});

emptyDeleteBtn.addEventListener('click', () => {
    manageData.deleteProject(todos);
    emptyPopup.classList.add('invisible-empty-project');
});

// Popup: Add Todo to Empty Project
addNewForm.addEventListener('submit', e => {
    manageData.addProjectTodo(e, todos);
    addTodoPopup.classList.add('invisible-add-new-todo');
    addNewForm.reset();
    addNewDate.removeAttribute('value');
});

addTodoDelete.addEventListener('click', () => {
    manageData.deleteProject(todos);
    addTodoPopup.classList.add('invisible-add-new-todo');
    addNewForm.reset();
    addNewDate.removeAttribute('value');
});

addNewLowPriority.addEventListener('click', () => {
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

addNewMediumPriority.addEventListener('click', () => {
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

addNewHighPriority.addEventListener('click', () => {
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

// Popup: Add New Todo or Project      
addNewBtn.addEventListener('click', () => {
    displayData.renderAddNewPopup();
});

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

// Todo Item Checkbox
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

uncheckboxIcon.forEach(box => {
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

// Popup: Notes
notesBtn.forEach(btn => {
    btn.addEventListener('click', e => displayData.renderNotesPopup(e, todos));
    notesClose.addEventListener('click', () => notesCard.classList.add('invisible-notes'));
}); 

// Popup: Edit Todo      
editBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        let editItem: number;
        let editProject: string; 
        const target = e.target;

        if (target instanceof HTMLElement) {
            const itemParent = target.parentElement;
            if (itemParent instanceof HTMLElement) {
                const itemGrandparent = itemParent.parentElement;
                if (itemGrandparent instanceof HTMLElement) {
                    editItem = Number(itemGrandparent.dataset.index);
                    editProject = itemGrandparent.dataset.project!;

                    displayData.renderEditPopup(editItem, editProject, todos);

                    editSubmit.addEventListener('submit', e => {
                        editCard.classList.add('invisible-edit');
                        manageData.editTodo(editItem, editProject, e, todos);
                    });
                }
            }
        }
    });
});

editClose.addEventListener('click', () => editCard.classList.add('invisible-edit'));

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

// Popup: Delete Todo
deleteBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        deletePopup.classList.remove('invisible-delete-todo');
        
        deleteConfirm.addEventListener('click', () => {
            manageData.deleteTodo(e, todos);
            deletePopup.classList.add('invisible-delete-todo');
        });
    });
});

deleteCancel.addEventListener('click', () => deletePopup.classList.add('invisible-delete-todo'));