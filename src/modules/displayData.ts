import { ProjectsObject } from "../util/types";
import { format } from 'date-fns';
import manageData from "./manageData";

export default (function displayData() {

    function renderFilterCounts(todos: ProjectsObject) {
        let allUncheckedTodos = 0;
        let todayUncheckedTodos = 0;
        let weekUncheckedTodos = 0;

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

    function renderHighlightedFilters(arg: (Event | string)) {
        const filterEl = document.querySelectorAll('.filters-btn');
        const filterBtns: NodeListOf<Element> = filterEl!;
        const projectEl = document.querySelectorAll('.project-name');
        const projectBtns: NodeListOf<Element> = projectEl!;

        filterBtns.forEach(btn => {
            btn.classList.remove('clicked');
        });

        projectBtns.forEach(item => {
            item.classList.remove('clicked');
        });

        if (arg instanceof Event) {
            (arg.target as Element).classList.add('clicked');

        } else if (typeof arg === 'string') {
            filterBtns.forEach(btn => {
                if (arg === 'all' && btn.classList.contains('all-btn')) {
                    btn.classList.add('clicked');
                } else if (arg === 'today' && btn.classList.contains('today-btn')) {
                    btn.classList.add('clicked');
                } else if (arg === 'week' && btn.classList.contains('week-btn')) {
                    btn.classList.add('clicked');
                }
            });
        
            projectBtns.forEach(btn => {
                if (btn.textContent === arg) {
                    btn.classList.add('clicked');
                }
            });
        }
    };

    function renderProjectList(todos: ProjectsObject) {
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
            projectItem.classList.add('project-item');
            const projectTitle = document.createElement('button');
            projectTitle.classList.add('project-name');
            projectTitle.textContent = project;
            const projectCounter = document.createElement('p');
            projectCounter.classList.add('project-counter');
            projectCounter.textContent = `${uncheckedTodos}`;
            projectItem.appendChild(projectTitle);
            projectItem.appendChild(projectCounter);
            projectContainer.appendChild(projectItem);

            /*if (manageData.getSelectedProject() === project) {
                highlightReloadedFilter(project);
            } else if (manageData.getSelectedProject() === 'all') {
                highlightReloadedFilter('all');
            } else if (manageData.getSelectedProject() === 'today') {
                highlightReloadedFilter('today');
            } else if (manageData.getSelectedProject() === 'week') {
                highlightReloadedFilter('week');
            } else {
                highlightReloadedFilter('all');
            }*/
        };
    };

    function renderEmptyProjectPopup(e: Event, todos: ProjectsObject, listContainer: Element) {
        /* const contentContainer = document.getElementById('content');
        const emptyContainer = document.querySelector('.empty-project-card');
        const emptyExit = document.getElementById('empty-cancel');
        const emptyTitle = document.querySelector('.empty-name');
        const emptyAdd = document.querySelector('.empty-add');
        const deleteProject = document.querySelector('.empty-delete');
        const allBtn = document.querySelector('.all-btn');
        const addNewCard = document.querySelector('.add-new-card');
        const addNewDate = document.getElementById('new-date');
        const dateObject = new Date();
        const month = format(dateObject, 'MM');
        const day = format(dateObject, 'dd');
        const year = format(dateObject, 'yyyy');
        const currentDay = `${year}-${month}-${day}`;
        
        emptyTitle.innerHTML = '';
        emptyTitle.textContent = manageData.getSelectedProject();
        
        emptyContainer.style.visibility = 'visible';
        contentContainer.classList.add('blur');

        emptyExit.addEventListener('click', () => {
            renderAllTodos(todos, listContainer);
            manageData.setSelectedProject('all');
            highlightReloadedFilter('all');
            emptyContainer.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
        });

        emptyAdd.addEventListener('click', () => {
            addNewDate.setAttribute('value', currentDay);
            emptyContainer.style.visibility = 'hidden';
            addNewCard.style.visibility = 'visible';
        });

        deleteProject.addEventListener('click', () => {
            delete todos[manageData.getSelectedProject()];
            localStorage.setItem('todos', JSON.stringify(todos));
            renderProjectList(todos, listContainer);
            manageData.setSelectedProject('all');
            renderAllTodos(todos, listContainer);
            allBtn.classList.add('clicked');
            emptyContainer.style.visibility = 'hidden';
            contentContainer.classList.remove('blur');
        }); */
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
                    renderCheckedTodo(todoItem);
                };

                listContainer.appendChild(todoItem);
            });
        }
        manageData.storeTodos(todos);
    };

    function renderTodayTodos(todos: ProjectsObject, listContainer: Element) {
        /* listContainer.innerHTML = '';

        for (const project in todos) {
            
            if (project !== 'today') {
                
                todos[project].forEach((todo, i) => {
                    
                    const today = new Date();
                    const todoDate = new Date(todo.dueDate);

                    if (
                        !todo.checked &&
                        today.getDate() === todoDate.getDate() &&
                        today.getMonth() === todoDate.getMonth() &&
                        today.getFullYear() === todoDate.getFullYear()
                    ) {
                        const todoItem = document.createElement('div');
                        todoItem.classList.add('list-item');
                        todoItem.classList.add(`${todo.priority}-priority`);
                        todoItem.setAttribute('data-index', i);
                        todoItem.setAttribute('data-project', `${todo.project}`);

                        const itemLeft = document.createElement('div');
                        itemLeft.classList.add('item-left');

                        const checkboxIcon = document.createElement('i');
                        checkboxIcon.classList.add('fa-regular', 'fa-square');
                        checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                        const itemName = document.createElement('p');
                        itemName.classList.add('item-description');
                        itemName.textContent = todo.title;
                        itemLeft.appendChild(checkboxIcon);
                        itemLeft.appendChild(itemName);

                        const itemRight = document.createElement('div');
                        itemRight.classList.add('item-right');

                        const notesBtn = document.createElement('button');
                        notesBtn.classList.add('item-notes');
                        notesBtn.textContent = 'NOTES';
                        notesBtn.addEventListener('click', e => renderNotesCard(e, todos[project]));

                        const dateText = document.createElement('p');
                        dateText.classList.add('item-date');
                        const dateObject = new Date(todo.dueDate);
                        const month = format(dateObject, 'MMM');
                        const day = format(dateObject, 'do');
                        dateText.textContent = `${month} ${day}`;

                        const editIcon = document.createElement('i');
                        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                        editIcon.addEventListener('click', e => renderEditCard(e, todos[project]));
                
                        const deleteIcon = document.createElement('i');
                        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                        deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                        itemRight.appendChild(notesBtn);
                        itemRight.appendChild(dateText);
                        itemRight.appendChild(editIcon);
                        itemRight.appendChild(deleteIcon);
                        todoItem.appendChild(itemLeft);
                        todoItem.appendChild(itemRight);
                        listContainer.appendChild(todoItem);
                    }
                });
            }
        }

        const todoList = todos[manageData.getSelectedProject()];

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {

            if (!todo.checked) {

                const todoItem = document.createElement('div');
                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', i);
                todoItem.setAttribute('data-project', `${todo.project}`);

                const itemLeft = document.createElement('div');
                itemLeft.classList.add('item-left');

                const checkboxIcon = document.createElement('i');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                const itemName = document.createElement('p');
                itemName.classList.add('item-description');
                itemName.textContent = todo.title;
                itemLeft.appendChild(checkboxIcon);
                itemLeft.appendChild(itemName);

                const itemRight = document.createElement('div');
                itemRight.classList.add('item-right');

                const notesBtn = document.createElement('button');
                notesBtn.classList.add('item-notes');
                notesBtn.textContent = 'NOTES';
                notesBtn.addEventListener('click', e => renderNotesCard(e, todoList));

                const dateText = document.createElement('p');
                dateText.classList.add('item-date');
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'MMM');
                const day = format(dateObject, 'do');
                dateText.textContent = `${month} ${day}`;

                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editIcon.addEventListener('click', e => renderEditCard(e, todos[project]));
          
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editIcon);
                itemRight.appendChild(deleteIcon);
                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);
                listContainer.appendChild(todoItem);
            }
        }); */
        manageData.storeTodos(todos);
    };

    function renderWeekTodos(todos: ProjectsObject, listContainer: Element) {
        /* listContainer.innerHTML = '';

        for (const project in todos) {
            
            if (project !== 'week') {

                todos[project].forEach((todo, i) => {

                    const today = new Date();
                    const todoDate = new Date(todo.dueDate);
                    const msDifference = Math.abs(today.getTime() - todoDate.getTime());
                    const dayDifference = msDifference / (24*60*60*1000);

                    if (!todo.checked && dayDifference <= 7) {

                        const todoItem = document.createElement('div');
                        todoItem.classList.add('list-item');
                        todoItem.classList.add(`${todo.priority}-priority`);
                        todoItem.setAttribute('data-index', i);
                        todoItem.setAttribute('data-project', `${todo.project}`);

                        const itemLeft = document.createElement('div');
                        itemLeft.classList.add('item-left');

                        const checkboxIcon = document.createElement('i');
                        checkboxIcon.classList.add('fa-regular', 'fa-square');
                        checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                        const itemName = document.createElement('p');
                        itemName.classList.add('item-description');
                        itemName.textContent = todo.title;
                        itemLeft.appendChild(checkboxIcon);
                        itemLeft.appendChild(itemName);

                        const itemRight = document.createElement('div');
                        itemRight.classList.add('item-right');

                        const notesBtn = document.createElement('button');
                        notesBtn.classList.add('item-notes');
                        notesBtn.textContent = 'NOTES';
                        notesBtn.addEventListener('click', e => renderNotesCard(e, todos[project]));

                        const dateText = document.createElement('p');
                        dateText.classList.add('item-date');
                        const dateObject = new Date(todo.dueDate);
                        const month = format(dateObject, 'MMM');
                        const day = format(dateObject, 'do');
                        dateText.textContent = `${month} ${day}`;

                        const editIcon = document.createElement('i');
                        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                        editIcon.addEventListener('click', e => renderEditCard(e, todos[project]));
                
                        const deleteIcon = document.createElement('i');
                        deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                        deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                        itemRight.appendChild(notesBtn);
                        itemRight.appendChild(dateText);
                        itemRight.appendChild(editIcon);
                        itemRight.appendChild(deleteIcon);
                        todoItem.appendChild(itemLeft);
                        todoItem.appendChild(itemRight);
                        listContainer.appendChild(todoItem);
                    }
                });
            }
        }

        const todoList = todos[manageData.getSelectedProject()];

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {

            if (!todo.checked) {

                const todoItem = document.createElement('div');
                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', i);
                todoItem.setAttribute('data-project', `${todo.project}`);

                const itemLeft = document.createElement('div');
                itemLeft.classList.add('item-left');

                const checkboxIcon = document.createElement('i');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                const itemName = document.createElement('p');
                itemName.classList.add('item-description');
                itemName.textContent = todo.title;
                itemLeft.appendChild(checkboxIcon);
                itemLeft.appendChild(itemName);

                const itemRight = document.createElement('div');
                itemRight.classList.add('item-right');

                const notesBtn = document.createElement('button');
                notesBtn.classList.add('item-notes');
                notesBtn.textContent = 'NOTES';
                notesBtn.addEventListener('click', e => renderNotesCard(e, todoList));

                const dateText = document.createElement('p');
                dateText.classList.add('item-date');
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'MMM');
                const day = format(dateObject, 'do');
                dateText.textContent = `${month} ${day}`;

                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editIcon.addEventListener('click', e => renderEditCard(e, todos[project]));
          
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editIcon);
                itemRight.appendChild(deleteIcon);
                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);
                listContainer.appendChild(todoItem);
            }
        }); */
        manageData.storeTodos(todos);
    };

    function renderProjectTodos(todos: ProjectsObject, listContainer: Element) {
        /* const todoList = todos[manageData.getSelectedProject()];
        
        listContainer.innerHTML = '';

        if (todoList.length === 0) {
            return;
        }

        todoList.forEach((todo, i) => {

            if (!todo.checked) {

                const todoItem = document.createElement('div');
                todoItem.classList.add('list-item');
                todoItem.classList.add(`${todo.priority}-priority`);
                todoItem.setAttribute('data-index', i);
                todoItem.setAttribute('data-project', `${todo.project}`);

                const itemLeft = document.createElement('div');
                itemLeft.classList.add('item-left');

                const checkboxIcon = document.createElement('i');
                checkboxIcon.classList.add('fa-regular', 'fa-square');
                checkboxIcon.addEventListener('click', e => toggleTodoCheckbox(e, todos, listContainer));

                const itemName = document.createElement('p');
                itemName.classList.add('item-description');
                itemName.textContent = todo.title;
                itemLeft.appendChild(checkboxIcon);
                itemLeft.appendChild(itemName);

                const itemRight = document.createElement('div');
                itemRight.classList.add('item-right');

                const notesBtn = document.createElement('button');
                notesBtn.classList.add('item-notes');
                notesBtn.textContent = 'NOTES';
                notesBtn.addEventListener('click', e => renderNotesCard(e, todoList));

                const dateText = document.createElement('p');
                dateText.classList.add('item-date');
                const dateObject = new Date(todo.dueDate);
                const month = format(dateObject, 'MMM');
                const day = format(dateObject, 'do');
                dateText.textContent = `${month} ${day}`;

                const editIcon = document.createElement('i');
                editIcon.classList.add('fa-solid', 'fa-pen-to-square');
                editIcon.addEventListener('click', e => renderEditCard(e, todos[project]));
          
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteIcon.addEventListener('click', e => manageData.deleteTodo(e, todos, listContainer));
                itemRight.appendChild(notesBtn);
                itemRight.appendChild(dateText);
                itemRight.appendChild(editIcon);
                itemRight.appendChild(deleteIcon);
                todoItem.appendChild(itemLeft);
                todoItem.appendChild(itemRight);
                listContainer.appendChild(todoItem);
            }
        }); */
        manageData.storeTodos(todos);
    };

    function renderCheckedTodo(arg: (Element | Event), todos?: ProjectsObject) {
        if (arg instanceof Element) {
            const todoItems = arg.children;
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

        } else if (arg instanceof Event) {
            const checkedTodo = (arg.target as Element).parentElement!.parentElement;
            const checkbox = (arg.target as Element);

            checkbox.classList.toggle('fa-square');
            checkbox.classList.toggle('fa-square-check');

            const todoItems = checkedTodo!.children;
            const itemsLeft = todoItems[0];
            const itemsRight = todoItems[1];
            const itemTitle = itemsLeft.children[1];
            const itemNotes = itemsRight.children[0];
            const itemDate = itemsRight.children[1];
            const itemEdit = itemsRight.children[2];

            itemTitle.classList.toggle('selected');
            itemTitle.classList.toggle('strike');
            itemNotes.classList.toggle('done');
            itemDate.classList.toggle('selected');
            itemEdit.classList.toggle('selected');
            
            const item: number = Number(checkedTodo!.dataset.index);
            const project: string = checkedTodo!.dataset.project!;
            todos![project][item].checked = !todos![project][item].checked;

            manageData.storeTodos(todos!);
            renderProjectList(todos!);
        }
    };

    function renderNotesPopup(e: Event, todos: ProjectsObject) {
        const notesEl = document.querySelector('.popup-notes');
        const notesCard: Element = notesEl!;
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
        let project: string;    //added per TS issue (remove and refactor?)
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
                    notesProject.textContent = todos[project][item].project;
                    notesDueDate.textContent = `${month} ${day}, ${year}`;
                    notesPriority.textContent = todos[project][item].priority[0].toUpperCase() + todos[project][item].priority.slice(1);
                    notesDetails.textContent = todos[project][item].details;
                }
            }
        }
        notesCard.classList.remove('invisible-notes');
    };

    function renderEditPopup(e: Event, todos: ProjectsObject) {
        const editEl = document.querySelector('.popup-edit');
        const editCard: Element = editEl!;
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

        editTitle.innerHTML = '';
        editDetails.innerHTML = '';

        let item: number;
        let project: string;    //added per TS issue (remove and refactor?)
        const target = e.target;

        if (target instanceof HTMLElement) {
            const itemParent = target.parentElement;
            if (itemParent instanceof HTMLElement) {
                const itemGrandparent = itemParent.parentElement;
                if (itemGrandparent instanceof HTMLElement) {
                    item = Number(itemGrandparent.dataset.index);
                    project = itemGrandparent.dataset.project!;

                    const dateObject = new Date(todos[project][item].dueDate);
                    const month = format(dateObject, 'MM');
                    const day = format(dateObject, 'dd');
                    const year = format(dateObject, 'yyyy');
                    const currentDay = `${year}-${month}-${day}`;

                    editTitle.textContent = todos[project][item].title;
                    editDetails.textContent = todos[project][item].details;
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

                    if (todos[project][item].priority === 'low') {
                        editLowPriority.checked = true;
                        editLowLabel.classList.remove('low');
                        editLowLabel.classList.add('low-checked');
                    } else if (todos[project][item].priority === 'medium') {
                        editMediumPriority.checked = true;
                        editMediumLabel.classList.remove('medium');
                        editMediumLabel.classList.add('medium-checked');
                    } else if (todos[project][item].priority === 'high') {
                        editHighPriority.checked = true;
                        editHighLabel.classList.remove('high');
                        editHighLabel.classList.add('high-checked');
                    } 
                }
            }
        }
        editCard.classList.remove('invisible-edit');
    };

    return {
        renderFilterCounts,
        renderHighlightedFilters,
        renderProjectList,
        renderAllTodos,
        renderTodayTodos,
        renderWeekTodos,
        renderProjectTodos,
        renderCheckedTodo,
        renderNotesPopup,
        renderEditPopup,
        renderEmptyProjectPopup
    };
})();