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
// Popup: Add Todo to Empty Project
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
// Popup: Add New Todo or Project
const addNewEl = document.querySelector('.projects-btn');
const addNewBtn: Element = addNewEl!;
        

function initialLoad(todos: ProjectsObject) {
    displayData.renderFilterList(todos);
    displayData.renderProjectList(todos);
    displayData.renderHighlightedCategory();
    displayData.renderAllTodos(todos);
};

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

// Popup: Add Todo to Empty Project
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

// Popup: Add New Todo or Project      
addNewBtn.addEventListener('click', () => {
    displayData.renderAddNewPopup();
});