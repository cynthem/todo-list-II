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