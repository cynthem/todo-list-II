export default (function manageData() {
    function createTodo(title: string, details: string, dueDate: string, priority: string, project: string, checked = false) {
        return {
            title,
            details,
            dueDate,
            priority,
            project,
            checked
        };
    }
    return {
        createTodo
    }
})();