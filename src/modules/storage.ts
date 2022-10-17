function getTodos() {
    let stored = localStorage.getItem('todos');
    let todoList;

    if (typeof stored === 'string') {
        todoList = JSON.parse(stored);
    } else {
        todoList = {
            'all': [],
            'today': [],
            'week': [],
            'Kitchen renovation': []
        }
    }
    return todoList;
}

let todos = getTodos();