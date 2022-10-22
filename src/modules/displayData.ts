import manageData from "./manageData";
import { ProjectsObject } from "../util/types";
import { currentDay } from '../util/dates';
import { format } from 'date-fns';

export default (function displayData() {
    
    function renderFilterList(todos: ProjectsObject) {
        const allTodosEl = document.querySelector('.all');
        const allTodosCount: Element = allTodosEl!;
        const todayTodosEl = document.querySelector('.today');
        const todayTodosCount: Element = todayTodosEl!;
        const weekTodosEl = document.querySelector('.week');
        const weekTodosCount: Element = weekTodosEl!;

        const todayTodos = { ...todos };
        const weekTodos = { ...todos };
        delete todayTodos.today;
        delete weekTodos.week;
        const today = new Date();

        let allUncheckedTodos = 0;
        let todayUncheckedTodos = 0;
        let weekUncheckedTodos = 0;

        todayUncheckedTodos = todos.today.reduce((total, value) => {
            return total + Number(!value.checked);
        }, 0);
        
        weekUncheckedTodos = todos.week.reduce((total, value) => {
            return total + Number(!value.checked);
        }, 0);

        for (const allTodos in todos) {
            todos[allTodos].forEach(todo => {
                if (!todo.checked) {
                    allUncheckedTodos++;
                }
            });
        }

        for (const project in todayTodos) {
            todayTodos[project].forEach(todo => {
                const todoDate = new Date(todo.dueDate);
                if (
                    today.getDate() === todoDate.getDate() &&
                    today.getMonth() === todoDate.getMonth() &&
                    today.getFullYear() === todoDate.getFullYear()
                ) {
                    if (!todo.checked) {
                        todayUncheckedTodos++;
                    }
                }
            });
        }

        for (const project in weekTodos) {
            weekTodos[project].forEach(todo => {
                const todoDate = new Date(todo.dueDate);
                const msDifference = Math.abs(today.getTime() - todoDate.getTime());
                const dayDifference = msDifference / (24*60*60*1000);
                if (dayDifference <= 7) {
                    if (!todo.checked) {
                        weekUncheckedTodos++;
                    }
                }
            });
        }

        allTodosCount.textContent = `${allUncheckedTodos}`;
        todayTodosCount.textContent = `${todayUncheckedTodos}`;
        weekTodosCount.textContent = `${weekUncheckedTodos}`;
    };

    function renderProjectList(todos: ProjectsObject, listContainer: Element) {
        const el1 = document.querySelector('.projects-list');
        const projectContainer: Element = el1!;
        projectContainer.innerHTML = '';

        const projectsObject = { ...todos };
        delete projectsObject['all'];
        delete projectsObject['today'];
        delete projectsObject['week'];

        for (const project in projectsObject) {
            let uncheckedTodos = 0;
            projectsObject[project].forEach(todo => {
                if (!todo.checked) {
                    uncheckedTodos++;
                }
            });

            const projectItem = document.createElement('div');
            const projectTitle = document.createElement('button');
            const projectCounter = document.createElement('p');

            projectItem.classList.add('project-item');
            projectCounter.classList.add('project-counter');
            projectCounter.textContent = `${uncheckedTodos}`;
            projectTitle.classList.add('project-name');
            projectTitle.textContent = project;
            projectTitle.addEventListener('click', e => {
                const projectName = (e.target as Element).textContent!;
                manageData.setSelectedProject(todos, projectName, listContainer);
            });
            
            projectItem.appendChild(projectTitle);
            projectItem.appendChild(projectCounter);
            projectContainer.appendChild(projectItem);
        };
    };

    function renderHighlightedCategory() {
        const filterEl = document.querySelectorAll('.filters-btn');
        const filterBtns: NodeListOf<Element> = filterEl!;
        const projectEl = document.querySelectorAll('.project-name');
        const projectBtns: NodeListOf<Element> = projectEl!;

        const projectName = manageData.getSelectedProject();

        filterBtns.forEach(btn => {
            btn.classList.remove('clicked');
        });

        projectBtns.forEach(item => {
            item.classList.remove('clicked');
        });

        filterBtns.forEach(btn => {
            if (projectName === 'all' && btn.classList.contains('all-btn')) {
                btn.classList.add('clicked');
            } else if (projectName === 'today' && btn.classList.contains('today-btn')) {
                btn.classList.add('clicked');
            } else if (projectName === 'week' && btn.classList.contains('week-btn')) {
                btn.classList.add('clicked');
            }
        });
    
        projectBtns.forEach(btn => {
            if (btn.textContent === projectName) {
                btn.classList.add('clicked');
            }
        });
    };

    function renderAllTodos(todos: ProjectsObject, listContainer: Element) {
        listContainer.innerHTML = '';

        for (const project in todos) {
            todos[project].forEach((todo, i) => {
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'MMM');
                const day = format(dateObject, 'do');

                const todoItem = document.createElement('div');
                const itemLeft = document.createElement('div');
                const itemRight = document.createElement('div');
                const checkboxIcon = document.createElement('i');
                const itemName = document.createElement('p');
                const notesBtn = document.createElement('button');
                const dateText = document.createElement('p');
                const editIcon = document.createElement('i');
                const deleteIcon = document.createElement('i');

                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', `${i}`);
                todoItem.setAttribute('data-project', `${todo.project}`);
                itemLeft.classList.add('list-item-left');
                itemRight.classList.add('list-item-right');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                itemName.classList.add('item-description');
                itemName.textContent = todo.title;
                notesBtn.classList.add('item-notes');
                notesBtn.textContent = 'NOTES';
                dateText.classList.add('item-date');
                dateText.textContent = `${month} ${day}`;
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');

                itemLeft.appendChild(checkboxIcon);
                itemLeft.appendChild(itemName);
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editIcon);
                itemRight.appendChild(deleteIcon);
                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);

                if (todo.checked) {
                    renderCheckedTodo(todos, todoItem, listContainer);
                };

                listContainer.appendChild(todoItem);

                checkboxIcon.addEventListener('click', e => {
                    let item: number;
                    let project: string;
                    const target = e.target;
            
                    if (target instanceof HTMLElement) {
                        const itemParent = target.parentElement;
                        if (itemParent instanceof HTMLElement) {
                            const itemGrandparent = itemParent.parentElement;
                            if (itemGrandparent instanceof HTMLElement) {
                                item = Number(itemGrandparent.dataset.index);
                                project = itemGrandparent.dataset.project!;
                                manageData.checkOffTodo(item, project, todos, listContainer, false);
                            }
                        }
                    }
                });

                notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));

                editIcon.addEventListener('click', e => {
                    let editItem: number;
                    let editProject: string; 
                    const target = e.target;
            
                    if (target instanceof HTMLElement) {
                        const itemParent = target.parentElement;
                        if (itemParent instanceof HTMLElement) {
                            const itemGrandparent = itemParent.parentElement;
                            if (itemGrandparent instanceof HTMLElement) {
                                editItem = Number(itemGrandparent.dataset.index);
                                editProject = itemGrandparent.dataset.project!;
                                renderEditPopup(editItem, editProject, todos, listContainer);
                            }
                        }
                    }
                });

                deleteIcon.addEventListener('click', e => {
                    let item: number;
                    let project: string;
                    const target = e.target;
            
                    if (target instanceof HTMLElement) {
                        const itemParent = target.parentElement;
                        if (itemParent instanceof HTMLElement) {
                            const itemGrandparent = itemParent.parentElement;
                            if (itemGrandparent instanceof HTMLElement) {
                                item = Number(itemGrandparent.dataset.index);
                                project = itemGrandparent.dataset.project!;
                                renderDeletePopup(item, project, todos, listContainer);
                            }
                        }
                    }
                });
            });
        }
    };

    function renderTodayTodos(todos: ProjectsObject, listContainer: Element) {
        listContainer.innerHTML = '';

        for (const project in todos) {
            if (project !== 'today') {
                todos[project].forEach((todo, i) => {
                    const today = new Date();
                    const todoDate = new Date(todo.dueDate);

                    if (
                        today.getDate() === todoDate.getDate() &&
                        today.getMonth() === todoDate.getMonth() &&
                        today.getFullYear() === todoDate.getFullYear()
                    ) {
                        const dateObject = new Date(todo.dueDate);
                        const month = format(dateObject, 'MMM');
                        const day = format(dateObject, 'do');

                        const todoItem = document.createElement('div');
                        const itemLeft = document.createElement('div');
                        const itemRight = document.createElement('div');
                        const checkboxIcon = document.createElement('i');
                        const itemName = document.createElement('p');
                        const notesBtn = document.createElement('button');
                        const dateText = document.createElement('p');
                        const editIcon = document.createElement('i');
                        const deleteIcon = document.createElement('i');

                        todoItem.classList.add('list-item');
                        todoItem.classList.add(`${todo.priority}-priority`);
                        todoItem.setAttribute('data-index', `${i}`);
                        todoItem.setAttribute('data-project', `${todo.project}`);
                        itemLeft.classList.add('list-item-left');
                        itemRight.classList.add('list-item-right');
                        checkboxIcon.classList.add('fa-regular', 'fa-square');
                        itemName.classList.add('item-description');
                        itemName.textContent = todo.title;
                        notesBtn.classList.add('item-notes');
                        notesBtn.textContent = 'NOTES';
                        dateText.classList.add('item-date');
                        dateText.textContent = `${month} ${day}`;
                        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                        deleteIcon.classList.add('fa-solid', 'fa-trash-can');

                        itemLeft.appendChild(checkboxIcon);
                        itemLeft.appendChild(itemName);
                        itemRight.appendChild(notesBtn);
                        itemRight.appendChild(dateText);
                        itemRight.appendChild(editIcon);
                        itemRight.appendChild(deleteIcon);
                        todoItem.appendChild(itemLeft);
                        todoItem.appendChild(itemRight);

                        if (todo.checked) {
                            renderCheckedTodo(todos, todoItem, listContainer);
                        };

                        listContainer.appendChild(todoItem);

                        checkboxIcon.addEventListener('click', e => {
                            let item: number;
                            let project: string;
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        item = Number(itemGrandparent.dataset.index);
                                        project = itemGrandparent.dataset.project!;
                                        manageData.checkOffTodo(item, project, todos, listContainer, false);
                                    }
                                }
                            }
                        });
        
                        notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));
        
                        editIcon.addEventListener('click', e => {
                            let editItem: number;
                            let editProject: string; 
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        editItem = Number(itemGrandparent.dataset.index);
                                        editProject = itemGrandparent.dataset.project!;
                                        renderEditPopup(editItem, editProject, todos, listContainer);
                                    }
                                }
                            }
                        });
        
                        deleteIcon.addEventListener('click', e => {
                            let item: number;
                            let project: string;
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        item = Number(itemGrandparent.dataset.index);
                                        project = itemGrandparent.dataset.project!;
                                        renderDeletePopup(item, project, todos, listContainer);
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }

        const todoList = todos[manageData.getSelectedProject()];

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {
            const dateObject = new Date(todo.dueDate);
            const month = format(dateObject, 'MMM');
            const day = format(dateObject, 'do');

            const todoItem = document.createElement('div');
            const itemLeft = document.createElement('div');
            const itemRight = document.createElement('div');
            const checkboxIcon = document.createElement('i');
            const itemName = document.createElement('p');
            const notesBtn = document.createElement('button');
            const dateText = document.createElement('p');
            const editIcon = document.createElement('i');
            const deleteIcon = document.createElement('i');

            todoItem.classList.add('list-item');
            todoItem.classList.add(`${todo.priority}-priority`);
            todoItem.setAttribute('data-index', `${i}`);
            todoItem.setAttribute('data-project', `${todo.project}`);
            itemLeft.classList.add('list-item-left');
            itemRight.classList.add('list-item-right');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            itemName.classList.add('item-description');
            itemName.textContent = todo.title;
            notesBtn.classList.add('item-notes');
            notesBtn.textContent = 'NOTES';
            dateText.classList.add('item-date');
            dateText.textContent = `${month} ${day}`;
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can');

            itemLeft.appendChild(checkboxIcon);
            itemLeft.appendChild(itemName);
            itemRight.appendChild(notesBtn);
            itemRight.appendChild(dateText);
            itemRight.appendChild(editIcon);
            itemRight.appendChild(deleteIcon);
            todoItem.appendChild(itemLeft);
            todoItem.appendChild(itemRight);

            if (todo.checked) {
                renderCheckedTodo(todos, todoItem, listContainer);
            };

            listContainer.appendChild(todoItem);

            checkboxIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            manageData.checkOffTodo(item, project, todos, listContainer, false);
                        }
                    }
                }
            });

            notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));

            editIcon.addEventListener('click', e => {
                let editItem: number;
                let editProject: string; 
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            editItem = Number(itemGrandparent.dataset.index);
                            editProject = itemGrandparent.dataset.project!;
                            renderEditPopup(editItem, editProject, todos, listContainer);
                        }
                    }
                }
            });

            deleteIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            renderDeletePopup(item, project, todos, listContainer);
                        }
                    }
                }
            });
        });
    };

    function renderWeekTodos(todos: ProjectsObject, listContainer: Element) {
        listContainer.innerHTML = '';

        for (const project in todos) {
            if (project !== 'week') {
                todos[project].forEach((todo, i) => {
                    const today = new Date();
                    const todoDate = new Date(todo.dueDate);
                    const msDifference = Math.abs(today.getTime() - todoDate.getTime());
                    const dayDifference = msDifference / (24*60*60*1000);

                    if (dayDifference <= 7) {
                        const dateObject = new Date(todo.dueDate);
                        const month = format(dateObject, 'MMM');
                        const day = format(dateObject, 'do');

                        const todoItem = document.createElement('div');
                        const itemLeft = document.createElement('div');
                        const itemRight = document.createElement('div');
                        const checkboxIcon = document.createElement('i');
                        const itemName = document.createElement('p');
                        const notesBtn = document.createElement('button');
                        const dateText = document.createElement('p');
                        const editIcon = document.createElement('i');
                        const deleteIcon = document.createElement('i');

                        todoItem.classList.add('list-item');
                        todoItem.classList.add(`${todo.priority}-priority`);
                        todoItem.setAttribute('data-index', `${i}`);
                        todoItem.setAttribute('data-project', `${todo.project}`);
                        itemLeft.classList.add('list-item-left');
                        itemRight.classList.add('list-item-right');
                        checkboxIcon.classList.add('fa-regular', 'fa-square');
                        itemName.classList.add('item-description');
                        itemName.textContent = todo.title;
                        notesBtn.classList.add('item-notes');
                        notesBtn.textContent = 'NOTES';
                        dateText.classList.add('item-date');
                        dateText.textContent = `${month} ${day}`;
                        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                        deleteIcon.classList.add('fa-solid', 'fa-trash-can');

                        itemLeft.appendChild(checkboxIcon);
                        itemLeft.appendChild(itemName);
                        itemRight.appendChild(notesBtn);
                        itemRight.appendChild(dateText);
                        itemRight.appendChild(editIcon);
                        itemRight.appendChild(deleteIcon);
                        todoItem.appendChild(itemLeft);
                        todoItem.appendChild(itemRight);

                        if (todo.checked) {
                            renderCheckedTodo(todos, todoItem, listContainer);
                        };
        
                        listContainer.appendChild(todoItem);

                        checkboxIcon.addEventListener('click', e => {
                            let item: number;
                            let project: string;
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        item = Number(itemGrandparent.dataset.index);
                                        project = itemGrandparent.dataset.project!;
                                        manageData.checkOffTodo(item, project, todos, listContainer, false);
                                    }
                                }
                            }
                        });
        
                        notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));
        
                        editIcon.addEventListener('click', e => {
                            let editItem: number;
                            let editProject: string; 
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        editItem = Number(itemGrandparent.dataset.index);
                                        editProject = itemGrandparent.dataset.project!;
                                        renderEditPopup(editItem, editProject, todos, listContainer);
                                    }
                                }
                            }
                        });
        
                        deleteIcon.addEventListener('click', e => {
                            let item: number;
                            let project: string;
                            const target = e.target;
                    
                            if (target instanceof HTMLElement) {
                                const itemParent = target.parentElement;
                                if (itemParent instanceof HTMLElement) {
                                    const itemGrandparent = itemParent.parentElement;
                                    if (itemGrandparent instanceof HTMLElement) {
                                        item = Number(itemGrandparent.dataset.index);
                                        project = itemGrandparent.dataset.project!;
                                        renderDeletePopup(item, project, todos, listContainer);
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }

        const todoList = todos[manageData.getSelectedProject()];

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {
            const dateObject = new Date(todo.dueDate);
            const month = format(dateObject, 'MMM');
            const day = format(dateObject, 'do');

            const todoItem = document.createElement('div');
            const itemLeft = document.createElement('div');
            const itemRight = document.createElement('div');
            const checkboxIcon = document.createElement('i');
            const itemName = document.createElement('p');
            const notesBtn = document.createElement('button');
            const dateText = document.createElement('p');
            const editIcon = document.createElement('i');
            const deleteIcon = document.createElement('i');

            todoItem.classList.add('list-item');
            todoItem.classList.add(`${todo.priority}-priority`);
            todoItem.setAttribute('data-index', `${i}`);
            todoItem.setAttribute('data-project', `${todo.project}`);
            itemLeft.classList.add('list-item-left');
            itemRight.classList.add('list-item-right');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            itemName.classList.add('item-description');
            itemName.textContent = todo.title;
            notesBtn.classList.add('item-notes');
            notesBtn.textContent = 'NOTES';
            dateText.classList.add('item-date');
            dateText.textContent = `${month} ${day}`;
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can');

            itemLeft.appendChild(checkboxIcon);
            itemLeft.appendChild(itemName);
            itemRight.appendChild(notesBtn);
            itemRight.appendChild(dateText);
            itemRight.appendChild(editIcon);
            itemRight.appendChild(deleteIcon);
            todoItem.appendChild(itemLeft);
            todoItem.appendChild(itemRight);

            if (todo.checked) {
                renderCheckedTodo(todos, todoItem, listContainer);
            };

            listContainer.appendChild(todoItem);

            checkboxIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            manageData.checkOffTodo(item, project, todos, listContainer, false);
                        }
                    }
                }
            });

            notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));

            editIcon.addEventListener('click', e => {
                let editItem: number;
                let editProject: string; 
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            editItem = Number(itemGrandparent.dataset.index);
                            editProject = itemGrandparent.dataset.project!;
                            renderEditPopup(editItem, editProject, todos, listContainer);
                        }
                    }
                }
            });

            deleteIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            renderDeletePopup(item, project, todos, listContainer);
                        }
                    }
                }
            });
        });
    };

    function renderProjectTodos(todos: ProjectsObject, listContainer: Element) {
        listContainer.innerHTML = '';

        const todoList = todos[manageData.getSelectedProject()];
       
        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {
            const dateObject = new Date(todo.dueDate);
            const month = format(dateObject, 'MMM');
            const day = format(dateObject, 'do');

            const todoItem = document.createElement('div');
            const itemLeft = document.createElement('div');
            const itemRight = document.createElement('div');
            const checkboxIcon = document.createElement('i');
            const itemName = document.createElement('p');
            const notesBtn = document.createElement('button');
            const dateText = document.createElement('p');
            const editIcon = document.createElement('i');
            const deleteIcon = document.createElement('i');

            todoItem.classList.add('list-item');
            todoItem.classList.add(`${todo.priority}-priority`);
            todoItem.setAttribute('data-index', `${i}`);
            todoItem.setAttribute('data-project', `${todo.project}`);
            itemLeft.classList.add('list-item-left');
            itemRight.classList.add('list-item-right');
            checkboxIcon.classList.add('fa-regular', 'fa-square');
            itemName.classList.add('item-description');
            itemName.textContent = todo.title;
            notesBtn.classList.add('item-notes');
            notesBtn.textContent = 'NOTES';
            dateText.classList.add('item-date');
            dateText.textContent = `${month} ${day}`;
            editIcon.classList.add('fa-solid', 'fa-pen-to-square');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can');

            itemLeft.appendChild(checkboxIcon);
            itemLeft.appendChild(itemName);
            itemRight.appendChild(notesBtn);
            itemRight.appendChild(dateText);
            itemRight.appendChild(editIcon);
            itemRight.appendChild(deleteIcon);
            todoItem.appendChild(itemLeft);
            todoItem.appendChild(itemRight);

            if (todo.checked) {
                renderCheckedTodo(todos, todoItem, listContainer);
            };

            listContainer.appendChild(todoItem);

            checkboxIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            manageData.checkOffTodo(item, project, todos, listContainer, true);
                        }
                    }
                }
            });

            notesBtn.addEventListener('click', e => renderNotesPopup(e, todos));

            editIcon.addEventListener('click', e => {
                let editItem: number;
                let editProject: string; 
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            editItem = Number(itemGrandparent.dataset.index);
                            editProject = itemGrandparent.dataset.project!;
                            renderEditPopup(editItem, editProject, todos, listContainer);
                        }
                    }
                }
            });

            deleteIcon.addEventListener('click', e => {
                let item: number;
                let project: string;
                const target = e.target;
        
                if (target instanceof HTMLElement) {
                    const itemParent = target.parentElement;
                    if (itemParent instanceof HTMLElement) {
                        const itemGrandparent = itemParent.parentElement;
                        if (itemGrandparent instanceof HTMLElement) {
                            item = Number(itemGrandparent.dataset.index);
                            project = itemGrandparent.dataset.project!;
                            renderDeletePopup(item, project, todos, listContainer);
                        }
                    }
                }
            });
        });
    };

    function renderCheckedTodo(todos: ProjectsObject, todoContainer: Element, listContainer: Element) {
        const todoItems = todoContainer.children;
        const itemsLeft = todoItems[0];
        const itemsRight = todoItems[1];
        const checkbox = itemsLeft.children[0];
        const itemTitle = itemsLeft.children[1];
        const itemNotes = itemsRight.children[0];
        const itemDate = itemsRight.children[1];
        const itemEdit = itemsRight.children[2]; 
    
        checkbox.classList.remove('fa-square');
        checkbox.classList.add('fa-square-check');
        itemTitle.classList.toggle('selected');
        itemTitle.classList.toggle('strike');
        itemNotes.classList.toggle('done');
        itemDate.classList.toggle('selected');
        itemEdit.classList.toggle('selected');
    };

    function renderAddNewPopup(todos: ProjectsObject, listContainer: Element) {
        const addNewPopupEl = document.querySelector('.popup-add-new');
        const addNewPopup: Element = addNewPopupEl!;
        const addNewCloseEl = document.querySelector('#add-exit');
        const addNewClose: Element = addNewCloseEl!;
        const addTodoFormEl = <HTMLFormElement>document.querySelector('.add-todo-form');
        const addTodoForm: HTMLFormElement = addTodoFormEl!;
        const addProjectFormEl = <HTMLFormElement>document.querySelector('.add-project-form');
        const addProjectForm: HTMLFormElement = addProjectFormEl!;
        const addTodoBtnEl = document.querySelector('.add-todo-btn');
        const addTodoBtn: Element = addTodoBtnEl!;
        const addProjectBtnEl = document.querySelector('.add-project-btn');
        const addProjectBtn: Element = addProjectBtnEl!;
        const addDateEl = <HTMLInputElement>document.getElementById('new-date');
        const addDate: HTMLInputElement = addDateEl!;
        const addLowPriorityEl = <HTMLInputElement>document.getElementById('new-low');
        const addLowPriority: HTMLInputElement = addLowPriorityEl!;
        const addMediumPriorityEl = <HTMLInputElement>document.getElementById('new-medium');
        const addMediumPriority: HTMLInputElement = addMediumPriorityEl!;
        const addHighPriorityEl = <HTMLInputElement>document.getElementById('new-high');
        const addHighPriority: HTMLInputElement = addHighPriorityEl!;
        const addLowLabelEl = <HTMLLabelElement>document.querySelector('.add-priority-label-low');
        const addLowLabel: HTMLLabelElement = addLowLabelEl!;
        const addMediumLabelEl = <HTMLLabelElement>document.querySelector('.add-priority-label-medium');
        const addMediumLabel: HTMLLabelElement = addMediumLabelEl!;
        const addHighLabelEl = <HTMLLabelElement>document.querySelector('.add-priority-label-high');
        const addHighLabel: HTMLLabelElement = addHighLabelEl!;

        if (addLowLabel.classList.contains('low-checked')) {
            addLowLabel.classList.remove('low-checked');
            addLowLabel.classList.add('low');
        }

        if (addMediumLabel.classList.contains('medium-checked')) {
            addMediumLabel.classList.remove('medium-checked');
            addMediumLabel.classList.add('medium');
        }

        if (addHighLabel.classList.contains('high-checked')) {
            addHighLabel.classList.remove('high-checked');
            addHighLabel.classList.add('high');
        }

        addDate.setAttribute('value', currentDay);
        addNewPopup.classList.remove('invisible-add-new');

        addNewClose.addEventListener('click', () => {
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });
        
        addTodoBtn.addEventListener('click', () => {
            addTodoBtn.classList.add('clicked');
            addTodoForm.style.display = 'grid';
            addProjectBtn.classList.remove('clicked');
            addProjectForm.style.display = 'none';
        });
        
        addProjectBtn.addEventListener('click', () => {
            addProjectBtn.classList.add('clicked');
            addProjectForm.style.display = 'grid';
            addTodoBtn.classList.remove('clicked');
            addTodoForm.style.display = 'none';
        });
        
        addTodoForm.addEventListener('submit', e => {
            manageData.addTodo(e, todos, listContainer);
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });
        
        addProjectForm.addEventListener('submit', e => {
            manageData.addProject(e, todos, listContainer);
            addNewPopup.classList.add('invisible-add-new');
            addTodoForm.reset();
            addTodoForm.style.display = 'grid';
            addProjectForm.reset();
            addProjectForm.style.display = 'none';
            addTodoBtn.classList.add('clicked');
            addProjectBtn.classList.remove('clicked');
            addDate.removeAttribute('value');
        });
        
        addLowPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low')) {
                addLowLabel.classList.remove('low');
                addLowLabel.classList.add('low-checked');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high');
            }
        });

        addMediumPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low');
            }
            if (addMediumLabel.classList.contains('medium')) {
                addMediumLabel.classList.remove('medium');
                addMediumLabel.classList.add('medium-checked');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high');
            }
        });
        
        addHighPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium');
            }
            if (addHighLabel.classList.contains('high')) {
                addHighLabel.classList.remove('high');
                addHighLabel.classList.add('high-checked');
            }
        });
    };

    function renderEmptyProjectPopup(todos: ProjectsObject, listContainer: Element) {
        const emptyPopupEl = document.querySelector('.popup-empty-project');
        const emptyPopup: Element = emptyPopupEl!;
        const emptyNameEl = document.querySelector('.empty-project-name');
        const emptyName: Element = emptyNameEl!;
        const emptyAddBtnEl = document.querySelector('.empty-project-add-btn');
        const emptyAddBtn: Element = emptyAddBtnEl!;
        const emptyDeleteBtnEl = document.querySelector('.empty-project-delete-btn');
        const emptyDeleteBtn: Element = emptyDeleteBtnEl!;

        emptyName.innerHTML = '';
        emptyName.textContent = manageData.getSelectedProject();

        emptyAddBtn.addEventListener('click', () => {
            renderAddTodoPopup(todos, listContainer);
            emptyPopup.classList.add('invisible-empty-project');
        });
        
        emptyDeleteBtn.addEventListener('click', () => {
            manageData.deleteProject(todos, listContainer);
            emptyPopup.classList.add('invisible-empty-project');
        });

        emptyPopup.classList.remove('invisible-empty-project');
    };

    function renderAddTodoPopup(todos: ProjectsObject, listContainer: Element) {
        const addTodoPopupEl = document.querySelector('.popup-add-new-todo');
        const addTodoPopup: Element = addTodoPopupEl!;
        const addProjectEl = document.querySelector('.add-new-todo-project');
        const addProjectName: Element = addProjectEl!;
        const addNewFormEl = <HTMLFormElement>document.querySelector('.add-new-todo-form');
        const addNewForm: HTMLFormElement = addNewFormEl!;
        const addDateEl = <HTMLInputElement>document.getElementById('new-todo-date');
        const addDate: HTMLInputElement = addDateEl!;
        const addTodoDeleteEl = document.querySelector('.add-new-delete-project');
        const addTodoDelete: Element = addTodoDeleteEl!;
        const addNewLowPriorityEl = <HTMLInputElement>document.getElementById('new-todo-low');
        const addNewLowPriority: HTMLInputElement = addNewLowPriorityEl!;
        const addNewMediumPriorityEl = <HTMLInputElement>document.getElementById('new-todo-medium');
        const addNewMediumPriority: HTMLInputElement = addNewMediumPriorityEl!;
        const addNewHighPriorityEl = <HTMLInputElement>document.getElementById('new-todo-high');
        const addNewHighPriority: HTMLInputElement = addNewHighPriorityEl!;
        const addLowLabelEl = <HTMLLabelElement>document.querySelector('.new-priority-label-low');
        const addLowLabel: HTMLLabelElement = addLowLabelEl!;
        const addMediumLabelEl = <HTMLLabelElement>document.querySelector('.new-priority-label-medium');
        const addMediumLabel: HTMLLabelElement = addMediumLabelEl!;
        const addHighLabelEl = <HTMLLabelElement>document.querySelector('.new-priority-label-high');
        const addHighLabel: HTMLLabelElement = addHighLabelEl!;
        
        const project = manageData.getSelectedProject();

        if (addLowLabel.classList.contains('low-checked')) {
            addLowLabel.classList.remove('low-checked');
            addLowLabel.classList.add('low-new');
        }

        if (addMediumLabel.classList.contains('medium-checked')) {
            addMediumLabel.classList.remove('medium-checked');
            addMediumLabel.classList.add('medium-new');
        }

        if (addHighLabel.classList.contains('high-checked')) {
            addHighLabel.classList.remove('high-checked');
            addHighLabel.classList.add('high-new');
        }

        addProjectName.textContent = project;
        addDate.setAttribute('value', currentDay);
        addTodoPopup.classList.remove('invisible-add-new-todo');

        addNewForm.addEventListener('submit', e => {
            manageData.addProjectTodo(e, todos, listContainer);
            addTodoPopup.classList.add('invisible-add-new-todo');
            addNewForm.reset();
            addDate.removeAttribute('value');
        });
        
        addTodoDelete.addEventListener('click', () => {
            manageData.deleteProject(todos, listContainer);
            addTodoPopup.classList.add('invisible-add-new-todo');
            addNewForm.reset();
            addDate.removeAttribute('value');
        });

        addNewLowPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-new')) {
                addLowLabel.classList.remove('low-new');
                addLowLabel.classList.add('low-checked');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium-new');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high-new');
            }
        });
        
        addNewMediumPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low-new');
            }
            if (addMediumLabel.classList.contains('medium-new')) {
                addMediumLabel.classList.remove('medium-new');
                addMediumLabel.classList.add('medium-checked');
            }
            if (addHighLabel.classList.contains('high-checked')) {
                addHighLabel.classList.remove('high-checked');
                addHighLabel.classList.add('high-new');
            }
        });
        
        addNewHighPriority.addEventListener('click', () => {
            if (addLowLabel.classList.contains('low-checked')) {
                addLowLabel.classList.remove('low-checked');
                addLowLabel.classList.add('low-new');
            }
            if (addMediumLabel.classList.contains('medium-checked')) {
                addMediumLabel.classList.remove('medium-checked');
                addMediumLabel.classList.add('medium-new');
            }
            if (addHighLabel.classList.contains('high-new')) {
                addHighLabel.classList.remove('high-new');
                addHighLabel.classList.add('high-checked');
            }
        });
    };

    function renderNotesPopup(e: Event, todos: ProjectsObject) {
        const notesEl = document.querySelector('.popup-notes');
        const notesCard: Element = notesEl!;
        const notesCloseEl = document.querySelector('.notes-close');
        const notesClose: Element = notesCloseEl!;
        const notesTitleEl = document.querySelector('.notes-title');
        const notesTitle: Element = notesTitleEl!; 
        const notesProjectEl = document.querySelector('.notes-project');
        const notesProject: Element = notesProjectEl!; 
        const notesDueDateEl = document.querySelector('.notes-date');
        const notesDueDate: Element = notesDueDateEl!;
        const notesPriorityEl = document.querySelector('.notes-priority');
        const notesPriority: Element = notesPriorityEl!;
        const notesDetailsEl = document.querySelector('.notes-details');
        const notesDetails: Element = notesDetailsEl!; 

        notesTitle.innerHTML = '';
        notesProject.innerHTML = '';
        notesDueDate.innerHTML = '';
        notesPriority.innerHTML = '';
        notesDetails.innerHTML = '';

        let item: number;
        let project: string;  
        const target = e.target;

        if (target instanceof HTMLElement) {
            const itemParent = target.parentElement;
            if (itemParent instanceof HTMLElement) {
                const itemGrandparent = itemParent.parentElement;
                if (itemGrandparent instanceof HTMLElement) {
                    item = Number(itemGrandparent.dataset.index);
                    project = itemGrandparent.dataset.project!;

                    const day = format(new Date(todos[project][item].dueDate), 'do');
                    const month = format(new Date(todos[project][item].dueDate), 'MMM');
                    const year = format(new Date(todos[project][item].dueDate), 'yyyy');

                    notesTitle.textContent = todos[project][item].title;
                    notesDueDate.textContent = `${month} ${day}, ${year}`;
                    notesPriority.textContent = todos[project][item].priority[0].toUpperCase() + todos[project][item].priority.slice(1);
                    notesDetails.textContent = todos[project][item].details;

                    if (project === 'all') {
                        notesProject.textContent = 'All';
                    } else if (project === 'today') {
                        notesProject.textContent = 'Today';
                    } else if (project === 'week') {
                        notesProject.textContent = 'This Week';
                    } else {
                        notesProject.textContent = todos[project][item].project;
                    }
                    
                    notesCard.classList.remove('invisible-notes');

                    notesClose.addEventListener('click', () => notesCard.classList.add('invisible-notes'));
                }
            }
        }
    };

    function renderEditPopup(index: number, projectName: string, todos: ProjectsObject, listContainer: Element) {
        const editEl = document.querySelector('.popup-edit');
        const editCard: Element = editEl!;
        const editCloseEl = document.querySelector('.edit-close');
        const editClose: Element = editCloseEl!;
        const editTitleEl = document.querySelector('.edit-title-textarea');
        const editTitle: Element = editTitleEl!;
        const editDetailsEl = document.querySelector('.edit-details-textarea');
        const editDetails: Element = editDetailsEl!;
        const editDueDateEl = document.getElementById('edit-date');
        const editDueDate: Element = editDueDateEl!;
        const editLowEl = <HTMLInputElement>document.getElementById('edit-low');
        const editLowPriority: HTMLInputElement = editLowEl!;
        const editMediumEl = <HTMLInputElement>document.getElementById('edit-medium');
        const editMediumPriority: HTMLInputElement = editMediumEl!;
        const editHighEl = <HTMLInputElement>document.getElementById('edit-high');
        const editHighPriority: HTMLInputElement = editHighEl!;
        const editLowLabelEl = document.getElementById('edit-low-label');
        const editLowLabel: Element = editLowLabelEl!;
        const editMediumLabelEl = document.getElementById('edit-medium-label');
        const editMediumLabel: Element = editMediumLabelEl!;
        const editHighLabelEl = document.getElementById('edit-high-label');
        const editHighLabel: Element = editHighLabelEl!;
        const editSubmitEl = document.querySelector('.edit-form');
        const editSubmit: Element = editSubmitEl!;

        editTitle.innerHTML = '';
        editDetails.innerHTML = '';

        const dateObject = new Date(todos[projectName][index].dueDate);
        const month = format(dateObject, 'MM');
        const day = format(dateObject, 'dd');
        const year = format(dateObject, 'yyyy');
        const currentDay = `${year}-${month}-${day}`;

        editTitle.textContent = todos[projectName][index].title;
        editDetails.textContent = todos[projectName][index].details;
        editDueDate.removeAttribute('value');
        editDueDate.setAttribute('value', currentDay);

        if (editLowLabel.classList.contains('low-checked')) {
            editLowLabel.classList.remove('low-checked');
            editLowLabel.classList.add('low');
        }
        if (editMediumLabel.classList.contains('medium-checked')) {
            editMediumLabel.classList.remove('medium-checked');
            editMediumLabel.classList.add('medium');
        }
        if (editHighLabel.classList.contains('high-checked')) {
            editHighLabel.classList.remove('high-checked');
            editHighLabel.classList.add('high');
        }

        if (todos[projectName][index].priority === 'low') {
            editLowPriority.checked = true;
            editLowLabel.classList.remove('low');
            editLowLabel.classList.add('low-checked');
        } else if (todos[projectName][index].priority === 'medium') {
            editMediumPriority.checked = true;
            editMediumLabel.classList.remove('medium');
            editMediumLabel.classList.add('medium-checked');
        } else if (todos[projectName][index].priority === 'high') {
            editHighPriority.checked = true;
            editHighLabel.classList.remove('high');
            editHighLabel.classList.add('high-checked');
        } 

        editCard.classList.remove('invisible-edit');

        editClose.addEventListener('click', () => editCard.classList.add('invisible-edit'));

        editSubmit.addEventListener('submit', e => {
            editCard.classList.add('invisible-edit');
            manageData.editTodo(index, projectName, e, todos, listContainer);
        });

        editLowPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low')) {
                editLowLabel.classList.remove('low');
                editLowLabel.classList.add('low-checked');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });
        
        editMediumPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium')) {
                editMediumLabel.classList.remove('medium');
                editMediumLabel.classList.add('medium-checked');
            }
            if (editHighLabel.classList.contains('high-checked')) {
                editHighLabel.classList.remove('high-checked');
                editHighLabel.classList.add('high');
            }
        });
        
        editHighPriority.addEventListener('click', () => {
            if (editLowLabel.classList.contains('low-checked')) {
                editLowLabel.classList.remove('low-checked');
                editLowLabel.classList.add('low');
            }
            if (editMediumLabel.classList.contains('medium-checked')) {
                editMediumLabel.classList.remove('medium-checked');
                editMediumLabel.classList.add('medium');
            }
            if (editHighLabel.classList.contains('high')) {
                editHighLabel.classList.remove('high');
                editHighLabel.classList.add('high-checked');
            }
        });
    };

    function renderDeletePopup(index: number, projectName: string, todos: ProjectsObject, listContainer: Element) {
        const deletePopupEl = document.querySelector('.popup-delete-todo');
        const deletePopup: Element = deletePopupEl!;
        const deleteConfirmEl = document.querySelector('.delete-todo-confirm-btn');
        const deleteConfirm: Element = deleteConfirmEl!;
        const deleteCancelEl = document.querySelector('.delete-todo-cancel-btn');
        const deleteCancel: Element = deleteCancelEl!;

        deletePopup.classList.remove('invisible-delete-todo');
                    
        deleteConfirm.addEventListener('click', () => {
            manageData.deleteTodo(index, projectName, todos, listContainer);
            deletePopup.classList.add('invisible-delete-todo');
        });

        deleteCancel.addEventListener('click', () => deletePopup.classList.add('invisible-delete-todo'));
    };

    return {
        renderFilterList,
        renderProjectList,
        renderHighlightedCategory,
        renderAllTodos,
        renderTodayTodos,
        renderWeekTodos,
        renderProjectTodos,
        renderCheckedTodo,
        renderAddNewPopup,
        renderEmptyProjectPopup,
        renderAddTodoPopup,
        renderNotesPopup,
        renderEditPopup,
        renderDeletePopup
    };
})();