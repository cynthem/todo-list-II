import { todos } from './todoList';

export default (function UI() {

    function loadPage() {
        /*displayData.renderAllTodos(todos, listContainer);
        displayData.renderProjectList(todos, listContainer); */
        loadDashboard();
        loadTodoList();
    };

    function loadDashboard() {
        loadFilters();
        loadProjects();
    };

    function loadTodoList() {
        loadTodoItems();
    };

    function loadFilters() {};

    function loadProjects() {};

    function loadTodoItems() {};

    return {
        loadPage
    };
})();