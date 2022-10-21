import displayData from './modules/displayData';
import manageData from './modules/manageData';
import { todos } from './modules/todoList';
import { ProjectsObject } from './util/types';
import './index.css';

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
        
        

function initialLoad(todos: ProjectsObject) {
    displayData.renderFilterList(todos);
    displayData.renderProjectList(todos);
    displayData.renderHighlightedCategory();
    displayData.renderAllTodos(todos);
};

function updateReload() {};

initialLoad(todos);

hamburgerMenu.addEventListener('click', () => {
    (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
});

// Dashboard buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const projectName = (e.target as Element).textContent!;
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


