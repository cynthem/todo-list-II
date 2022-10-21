import displayData from './modules/displayData';
import manageData from './modules/manageData';
import { todos } from './modules/todoList';
import { ProjectsObject } from './util/types';
import './index.css';

const dashboardEl = document.querySelector('.main-dashboard');
const dashboard: Element = dashboardEl!;
const hamburgerEl = document.querySelector('.fa-bars');
const hamburgerMenu: Element = hamburgerEl!;
const filterEl = document.querySelectorAll('.filters-btn');
const filterBtns: NodeListOf<Element> = filterEl!;
        

function initialLoad(todos: ProjectsObject) {
    manageData.setSelectedProject(todos, 'all');
    displayData.renderFilterList(todos);
    displayData.renderProjectList(todos);
    displayData.renderAllTodos(todos);
};

function categoryReload(todos: ProjectsObject, projectName: string) {
    manageData.setSelectedProject(todos, projectName);
};

function updateReload() {};

initialLoad(todos);

hamburgerMenu.addEventListener('click', () => {
    (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const project = (e.target as Element).textContent!;
        manageData.manageTodosRender(project);
    });
});
