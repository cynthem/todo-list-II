type TodoObject = {
    'title': string,
    'details': string,
    'dueDate': string,
    'priority': string,
    'project': string,
    'checked': boolean
};

export interface ProjectsObject {
    'all': TodoObject[],
    'today': TodoObject[],
    'week': TodoObject[],
    'Kitchen renovation': TodoObject[]
};