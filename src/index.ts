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