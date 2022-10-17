import { todos } from './todoList';
import { currentDay } from '../util/dates';

export default (function UI() {

    function loadPage() {
        /*displayData.renderAllTodos(todos, listContainer);
        displayData.renderProjectList(todos, listContainer); */
        loadHeader();
        loadDashboard();
        loadTodoList();
    };

    function loadHeader() {
        const el1 = document.querySelector('.main-dashboard');
        const dashboard: Element = el1!;
        const el2 = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = el2!;
        hamburgerMenu.addEventListener('click', () => {
            console.log('hello');
            (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    };

    function loadDashboard() {
        loadFilters();
        loadProjects();
    };

    function loadTodoList() {
        loadTodoItems();
    };

    function loadFilters() {
        const filterBtns = document.querySelectorAll('.filters-btn');
        /* filterBtns.forEach(btn => {
    btn.addEventListener('click', e => changeDOM.manageTodosRender(e, todos, listContainer));
}); */
    };

    function loadProjects() {};

    function loadTodoItems() {};

    return {
        loadPage,
        loadHeader
    };
})();