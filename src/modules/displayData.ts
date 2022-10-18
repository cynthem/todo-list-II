import { TodoObject, ProjectsObject } from "../util/types";

export default (function displayData() {

    function renderFilters(todos: ProjectsObject, listContainer: Element) {
        /*let allUncheckedTodos = 0;
        for (const todoList in todos) {
            todos[todoList].forEach(todo => {
                if (!todo.checked) {
                    allUncheckedTodos++;
                }
            })
        };
        const allCount = document.querySelector('.all');
        allCount.textContent = allUncheckedTodos;

        let todayUncheckedTodos;
        todayUncheckedTodos = todos.today.reduce((total, value) => {
            return total + !value.checked;
        }, 0);
        const projectsObjectTwo = Object.assign({}, todos);
        delete projectsObjectTwo.today;
        for (const projectTwo in projectsObjectTwo) {
            projectsObjectTwo[projectTwo].forEach(todo => {
                    const today = new Date();
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
        const todayCount = document.querySelector('.today');
        todayCount.textContent = todayUncheckedTodos;

        let weekUncheckedTodos;
        weekUncheckedTodos = todos.week.reduce((total, value) => {
            return total + !value.checked;
        }, 0);
        const projectsObjectThree = Object.assign({}, todos);
        delete projectsObjectThree.week;
        for (const projectThree in projectsObjectThree) {
            projectsObjectThree[projectThree].forEach(todo => {
                const today = new Date();
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
        const weekCount = document.querySelector('.week');
        weekCount.textContent = weekUncheckedTodos; */
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

    return {
        renderFilters,
        renderProjectList
    };
})();