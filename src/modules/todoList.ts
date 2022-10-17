import manageData from './manageData';
import { format } from 'date-fns';

/**
 * 
 * @returns a list of todos that are either already locally stored, or a default list
 * 
 */
function getTodos() {
    type TodoObject = {
        'title': string,
        'details': string,
        'dueDate': string,
        'priority': string,
        'project': string,
        'checked': boolean
    };

    interface ProjectsObject {
        'all': TodoObject[],
        'today': TodoObject[],
        'week': TodoObject[],
        'Kitchen renovation': TodoObject[]
    };

    let todoList: ProjectsObject;

    const stored = localStorage.getItem('todos');

    /*Formatted dates for default todo list*/
    const dateObject = new Date();
    const month = format(dateObject, 'MM');
    const day = format(dateObject, 'dd');
    const year = format(dateObject, 'yyyy');
    const today = `${month}-${day}-${year}`;
    const weekPast = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() - 7);
    const weekAgoMonth = format(weekPast, 'MM');
    const weekAgoDay = format(weekPast, 'dd');
    const weekAgoYear = format(weekPast, 'yyyy');
    const weekAgo = `${weekAgoMonth}-${weekAgoDay}-${weekAgoYear}`;
    const weekFuture = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() + 5);
    const weekFutureMonth = format(weekFuture, 'MM');
    const weekFutureDay = format(weekFuture, 'dd');
    const weekFutureYear = format(weekFuture, 'yyyy');
    const weekNext = `${weekFutureMonth}-${weekFutureDay}-${weekFutureYear}`;
    const monthFuture = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() + 32);
    const monthFutureMonth = format(monthFuture, 'MM');
    const monthFutureDay = format(monthFuture, 'dd');
    const monthFutureYear = format(monthFuture, 'yyyy');
    const monthNext = `${monthFutureMonth}-${monthFutureDay}-${monthFutureYear}`;

    if (typeof stored === 'string') {
        todoList = JSON.parse(stored);
    } else {
        todoList = {
            'all': [],
            'today': [],
            'week': [],
            'Kitchen renovation': []
        };

        todoList['Kitchen renovation'].push(manageData.createTodo('Remove vinyl floor', 'replace with subfloor', weekNext, 'high', 'Kitchen renovation'));
        todoList['Kitchen renovation'].push(manageData.createTodo('Build cabinets', 'pre-painted cabinets only', weekAgo, 'low', 'Kitchen renovation', true));
        todoList['Kitchen renovation'].push(manageData.createTodo('Install countertop', 'leave room for butcher block', monthNext, 'medium', 'Kitchen renovation'));
        todoList['all'].push(manageData.createTodo('Finish book for book club', 'let Angela borrow afterward', today, 'high', 'all'));
    }
    return todoList;
}

export const todos = getTodos();