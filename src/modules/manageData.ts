export default (function manageData() {

    function createTodo(title: string, details: string, dueDate: string, priority: string, project: string, checked = false) {
        interface todoItemType {
            'title': string,
            'details': string,
            'dueDate': string,
            'priority': string,
            'project': string,
            'checked': boolean
        }
        const todoItem: todoItemType = {
            title,
            details,
            dueDate,
            priority,
            project,
            checked
        }
        return todoItem;
    }

    return {
        createTodo
    }
})();