export type TodoObject = {
    'title': string,
    'details': string,
    'dueDate': string,
    'priority': string,
    'project': string,
    'checked': boolean
};

export interface ProjectsObject {
    [all: string]: TodoObject[]
};