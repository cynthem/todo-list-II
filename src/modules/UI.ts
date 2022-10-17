import { todos } from './todoList';
import { currentDay } from '../util/dates';

export default (function UI() {

    function loadPage() {
        loadDashboard();
        loadTodoList();
    };

    function loadDashboard() {
        toggleDashboard();
        toggleFilters();
        loadProjects();
    };

    function toggleDashboard() {
        const el1 = document.querySelector('.main-dashboard');
        const dashboard: Element = el1!;
        const el2 = document.querySelector('.fa-bars');
        const hamburgerMenu: Element = el2!;
        hamburgerMenu.addEventListener('click', () => {
            console.log('hello');
            (<HTMLElement>dashboard).style.visibility = (<HTMLElement>dashboard).style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    };

    function toggleFilters() {
        const filterBtns = document.querySelectorAll('.filters-btn');
        /* filterBtns.forEach(btn => {
    btn.addEventListener('click', e => changeDOM.manageTodosRender(e, todos, listContainer));
}); */
    };

    function loadProjects() {
        handleAddBtn();
        toggleProjects();
        handleEmptyProject();
    };

    function handleAddBtn() {};

    function toggleProjects() {};

    function handleEmptyProject() {};

    function loadTodoList() {
        /*displayData.renderAllTodos(todos, listContainer);
        displayData.renderProjectList(todos, listContainer); */
        loadTodoItems();
    };

    function loadTodoItems() {
        handleCheckbox();
        handleNotesBtn();
        handleEditBtn();
        handleDeleteBtn();
    };

    function handleCheckbox() {};

    function handleNotesBtn() {};

    function handleEditBtn() {};

    function handleDeleteBtn() {};

    return { loadPage };
})();