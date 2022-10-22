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

const dashboardEl = document.querySelector('.main-dashboard');
const dashboard: Element = dashboardEl!;
const hamburgerEl = document.querySelector('.fa-bars');
const hamburgerMenu: Element = hamburgerEl!;
const filterEl = document.querySelectorAll('.filters-btn');
const filterBtns: NodeListOf<Element> = filterEl!;
const addNewEl = document.querySelector('.projects-btn');
const addNewBtn: Element = addNewEl!;
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

// Dashboard toggle
hamburgerMenu.addEventListener('click', () => {
    (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
});

// Filter buttons
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

// Add-New Button    
addNewBtn.addEventListener('click', () => {
    displayData.renderAddNewPopup(todos);
});

// Todo Item Checkbox


uncheckboxIcon.forEach(box => {
    
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