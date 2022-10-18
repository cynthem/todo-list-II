import manageData from './manageData';
import { ProjectsObject } from '../util/types';
import { today, weekAgo, weekNext, monthNext } from '../util/dates';

/**
 * 
 * @returns a list of todos that are either already locally stored, or a default list
 * 
 */
function getTodos() {
    let todoList: ProjectsObject | string;

    const stored = localStorage.getItem('todos');

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