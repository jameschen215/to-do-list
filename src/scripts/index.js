import '../styles/reset.css';
import '../styles/main.css';

import { initializeApp, rehydrateApp } from './logic/initialize-app';
import { capitalizeFirstLetter } from './utils';

import Todo from './logic/to-do';
import Project from './logic/project';
import ChecklistItem from './logic/checklist-item';

import todoList from './components/todo-list';
import todoForm from './components/todo-form';
import projectList from './components/project-list';
import projectForm from './components/project-form';
import todoDetail from './components/todo-detail';
import contentHeader from './components/content-header';

(function displayController() {
	/* ============== Handle project events ============== */
	// 1. Handle Adding Project
	function handleAddProject() {
		document.querySelector('#add-project-btn').addEventListener('click', () => {
			// 1.1 show form
			const form = projectForm();
			dialogDom.append(form);
			dialogDom.showModal();

			// make input focus
			setTimeout(() => {
				const input = document.querySelector('#project-title');
				if (input !== null) {
					input.focus();
				}
			}, 100);

			// 1.2 submit form
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				const formData = new FormData(event.target);
				const title = formData.get('project-title');

				// TODO: Check if the title is empty

				// TODO: Check if there is any project with the same title existed.

				const newProject = new Project(title);
				activeProject = newProject;
				app.projects.push(newProject);
				localStorage.setItem('app', JSON.stringify(app));

				// new project has no todo
				activeTodo = undefined;

				dialogDom.close();
			});
		});
	}

	// 2. Handle Editing Project
	function handleEditProject() {
		document.querySelectorAll('.edit-project-btn').forEach((button) => {
			// 2.1 Show form
			button.addEventListener('click', (event) => {
				event.stopPropagation();

				const projectId = parseInt(event.currentTarget.dataset.projectId);
				const project = app.projects.find(
					(project) => project.id === projectId
				);

				if (project === undefined) {
					dialogDom.removeChild(form);
					dialogDom.close();
				}

				const form = projectForm(project);
				dialogDom.appendChild(form);
				dialogDom.showModal();

				// make input focus and the cursor at the end of the text
				setTimeout(() => {
					const input = document.querySelector('#project-title');
					if (input !== null) {
						input.focus();
						input.setSelectionRange(input.value.length, input.value.length);
					}
				}, 100);

				// 2.2 Submit form
				form.addEventListener('submit', (event) => {
					event.preventDefault();

					const formData = new FormData(event.target);
					const title = formData.get('project-title');

					// TODO: Check if the title is empty

					// TODO: Check if there is any project with the same title existed.

					project.editTitle(title);

					activeProject = project;

					if (activeProject.todos.length > 0) {
						activeTodo = activeProject.todos[0];
					} else {
						activeTodo = undefined;
					}

					localStorage.setItem('app', JSON.stringify(app));
					dialogDom.close();
				});
			});
		});
	}

	// 3. Handle Deleting Project
	function handleDeleteProject() {
		document.querySelectorAll('.delete-project-btn').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.stopPropagation();

				const projectId = parseInt(event.currentTarget.dataset.projectId);
				app.deleteProject(projectId);

				if (projectId === activeProject.id && app.projects.length > 0) {
					activeProject = app.projects[0];
				} else {
					activeProject = undefined;
				}

				localStorage.setItem('app', JSON.stringify(app));
				updateDisplay();
				console.log(`Project width ID ${projectId} has been eliminated.`);
			});
		});
	}

	// 4. Handle Choosing Project
	function handleProjectClick() {
		document.querySelectorAll('.project').forEach((button) => {
			button.addEventListener('click', (event) => {
				const projectId = parseInt(event.currentTarget.dataset.projectId);

				activeProject = app.projects.find(
					(project) => project.id === projectId
				);

				if (activeProject.todos.length > 0) {
					activeTodo = activeProject.todos[0];
				} else {
					activeTodo = undefined;
				}

				updateDisplay();
			});
		});
	}

	/* ================ Handle todo events ================ */
	// 1. Handle Adding New Todo
	function handleAddTodo() {
		// 1. show form
		document.querySelector('#add-todo-btn').addEventListener('click', () => {
			const form = todoForm();
			dialogDom.appendChild(form);
			dialogDom.showModal();

			setTimeout(() => {
				const input = document.querySelector('#title');
				if (input !== null) {
					input.focus();
				}
			}, 100);

			form.addEventListener('submit', (event) => {
				event.preventDefault();

				const formData = new FormData(event.target);

				// TODO: form validation

				const newTodo = new Todo(Object.fromEntries(formData.entries()));
				activeProject.todos.push(newTodo);
				activeTodo = newTodo;
				console.log(Object.fromEntries(formData.entries()));

				localStorage.setItem('app', JSON.stringify(app));

				dialogDom.close();
			});
		});
	}

	// 2. Handle Editing a Todo
	function handleEditTodo() {
		// 1. show form
		document.querySelectorAll('.edit-todo-btn').forEach((todoListItem) =>
			todoListItem.addEventListener('click', (event) => {
				event.stopPropagation();
				console.log('clicked');

				const todoId = parseInt(
					event.currentTarget.parentElement.parentElement.id.split('-')[1]
				);
				const todo = activeProject.todos.find((todo) => todo.id === todoId);

				if (todo === undefined) return;

				const form = todoForm(todo);
				dialogDom.appendChild(form);
				dialogDom.showModal();

				// make input focus and the cursor at the end of the text
				setTimeout(() => {
					const input = document.querySelector('#title');
					if (input !== null) {
						input.focus();
						input.setSelectionRange(input.value.length, input.value.length);
					}
				}, 100);

				form.addEventListener('submit', (event) => {
					event.preventDefault();

					const formData = new FormData(event.target);

					// TODO: form validation

					todo.editTodo(Object.fromEntries(formData.entries()));
					activeTodo = todo;

					localStorage.setItem('app', JSON.stringify(app));

					dialogDom.close();
				});
			})
		);
	}

	// 3. Handle Deleting a Todo
	function handleDeleteTodo() {
		document.querySelectorAll('.delete-todo-btn').forEach((deleteBtn) => {
			deleteBtn.addEventListener('click', (event) => {
				event.stopImmediatePropagation();

				const todoId = parseInt(
					event.currentTarget.parentElement.parentElement.id.split('-')[1]
				);
				activeProject.deleteTodo(todoId);
				if (todoId === activeTodo.id) {
					activeTodo = activeProject.todos[0];
				}

				localStorage.setItem('app', JSON.stringify(app));
				updateDisplay();
			});
		});
	}

	// 4. Handle Todo clicking
	function handleTodoClick() {
		document.querySelectorAll('.todo-list-item').forEach((item) => {
			item.addEventListener('click', (event) => {
				const todoId = parseInt(event.currentTarget.id.split('-')[1]);
				activeTodo = activeProject.todos.find((todo) => todo.id === todoId);

				updateDisplay();
			});
		});
	}

	// 5. Handle Sort By Change
	function handleSortByChange() {
		const dropdownTrigger = document.querySelector('.trigger');
		const dropdown = document.querySelector('#dropdown-sort');
		const dropdownOptions = document.querySelectorAll('#dropdown-sort .option');

		dropdownTrigger.addEventListener('click', (event) => {
			event.stopPropagation();
			// close all other dropdowns
			[...document.querySelectorAll('.dropdown')]
				.filter((d) => d !== dropdown)
				.forEach((dropdown) => {
					if (!dropdown.classList.contains('hidden')) {
						dropdown.classList.add('hidden');
					}
				});
			dropdown.classList.toggle('hidden');
		});

		dropdownOptions.forEach((button) => {
			button.addEventListener('click', (event) => {
				const sort = event.currentTarget.dataset.sortBy;
				dropdownTrigger.textContent = capitalizeFirstLetter(sort);
				dropdown.classList.add('hidden');
				sortBy = sort;

				updateDisplay();
			});
		});

		// Hide dropdown when clicking outside
		document.addEventListener('click', () => {
			if (!dropdown.classList.contains('hidden')) {
				dropdown.classList.add('hidden');
			}
		});
	}

	// 6. Handle Toggle Todo Completed
	function handleToggleTodos() {
		const checkboxes = document.querySelectorAll('.completed-input');
		const toggleBtn = document.querySelector('.toggle-completed-btn');

		if (checkboxes.length !== 0) {
			checkboxes.forEach((checkbox) => {
				checkbox.addEventListener('click', (event) => {
					event.stopImmediatePropagation();

					const todoId = parseInt(event.currentTarget.id);
					const todo = activeProject.todos.find((todo) => todo.id === todoId);
					todo.toggleCompleted();

					localStorage.setItem('app', JSON.stringify(app));
					updateDisplay();
				});
			});
		}

		if (toggleBtn !== null) {
			toggleBtn.addEventListener('click', () => {
				activeTodo.toggleCompleted();
				updateDisplay();
			});
		}
	}

	// 7. Handle Toggle All Todo Completed
	function handleToggleAllTodoCompleted() {
		// TODO:
		const dropdownTrigger = document.querySelector('#check-trigger');
		const dropdown = document.querySelector('#dropdown-check');
		const dropdownOptions = document.querySelectorAll(
			'#dropdown-check .option'
		);

		dropdownTrigger.addEventListener('click', (event) => {
			event.stopPropagation();

			// close all other dropdowns
			[...document.querySelectorAll('.dropdown')]
				.filter((d) => d !== dropdown)
				.forEach((dropdown) => {
					if (!dropdown.classList.contains('hidden')) {
						dropdown.classList.add('hidden');
					}
				});

			dropdown.classList.toggle('hidden');
		});

		dropdownOptions.forEach((button) => {
			button.addEventListener('click', (event) => {
				if (event.currentTarget.value === 'check-all') {
					activeProject.makeAllTodosCompleted();
				} else if (event.currentTarget.value === 'uncheck-all') {
					activeProject.makeAllTodosIncomplete();
				}

				localStorage.setItem('app', JSON.stringify(app));

				dropdown.classList.add('hidden');
				updateDisplay();
			});
		});

		// Hide dropdown when clicking outside
		document.addEventListener('click', () => {
			if (!dropdown.classList.contains('hidden')) {
				dropdown.classList.add('hidden');
			}
		});
	}

	/* ============== Handle checklist events ============== */
	// 1. Handle Add Checklist Item
	function handleAddChecklistItem() {
		const addChecklistItemBtn = document.querySelector(
			'.button-container button'
		);
		addChecklistItemBtn.addEventListener('click', () => {
			const ul = document.querySelector('.checklist');

			const li = document.createElement('li');
			li.classList.add('checklist-item');
			li.classList.add('editing');

			const checkIcon = document.createElement('div');
			checkIcon.classList.add('check-icon');

			const input = document.createElement('input');
			input.type = 'text';

			li.appendChild(checkIcon);
			li.appendChild(input);
			ul.insertBefore(li, ul.lastElementChild);
			input.focus();

			// Handle input
			input.addEventListener('blur', (event) => {
				const text = event.currentTarget.value;

				if (text === '') {
					updateDisplay();
					return;
				}

				const checklistItem = new ChecklistItem(event.currentTarget.value);
				activeTodo.checklist.push(checklistItem);

				localStorage.setItem('app', JSON.stringify(app));
				updateDisplay();
			});

			input.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === 'Escape') {
					event.currentTarget.blur();
				}
			});
		});
	}

	// 2. Handle Checklist Item Click
	function handleChecklistItemClick() {
		document.querySelectorAll('li input[type="text"]').forEach((input) => {
			input.addEventListener('focus', () => {
				input.parentElement.classList.add('editing');
			});

			input.addEventListener('blur', () => {
				input.parentElement.classList.remove('editing');
			});

			input.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === 'Escape') {
					input.blur();
				}
			});

			input.addEventListener('input', (event) => {
				const checklistItemId = parseInt(
					event.currentTarget.parentElement.id.split('-')[2]
				);

				const checklistItem = activeTodo.checklist.find(
					(checklistItem) => checklistItem.id === checklistItemId
				);

				if (checklistItem === undefined) return;

				checklistItem.name = event.currentTarget.value;

				localStorage.setItem('app', JSON.stringify(app));
			});
		});
	}

	// 3. Handle Toggle Checklist Item
	function handleToggleChecklistItem() {
		const checkboxes = document.querySelectorAll('.done');

		if (checkboxes.length === 0) return;

		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener('click', (event) => {
				event.stopPropagation();
				const checklistItemId = parseInt(
					event.currentTarget.parentElement.id.split('-')[2]
				);

				const checklistItem = activeTodo.checklist.find(
					(checklistItem) => checklistItem.id === checklistItemId
				);

				if (checklistItem === undefined) return;
				checklistItem.toggleDone();

				localStorage.setItem('app', JSON.stringify(app));
				updateDisplay();
			});
		});
	}

	// 4. Handle Delete Checklist Item
	function handleDeleteChecklistItem() {
		document.querySelectorAll('li button').forEach((button) => {
			button.addEventListener('click', (event) => {
				const checklistItemId = parseInt(
					event.currentTarget.parentElement.id.split('-')[2]
				);

				if (isNaN(checklistItemId)) return;

				console.log(checklistItemId);
				console.log(activeTodo);

				activeTodo.deleteChecklistItem(checklistItemId);

				localStorage.setItem('app', JSON.stringify(app));
				updateDisplay();
			});
		});
	}

	/* =================== Update display =================== */
	function updateDisplay() {
		// get active project and sorted todos
		if (app.projects.length > 0 && activeProject === undefined) {
			activeProject = app.projects[0];
		}

		if (activeProject !== undefined) {
			sortedTodos = activeProject.todos.sort((a, b) => {
				if (a.completed === b.completed) {
					if (sortBy === 'title') {
						return a[sortBy].localeCompare(b[sortBy]);
					} else {
						return a[sortBy] - b[sortBy];
					}
				}

				return a.completed - b.completed;
			});
		}

		// get active todo
		if (
			activeProject !== undefined &&
			activeProject.todos.length > 0 &&
			activeTodo === undefined
		) {
			activeTodo = activeProject.todos[0];
		}

		// get page content
		const projectListHtml = projectList(app.projects, activeProject);
		const contentHeaderHtml = contentHeader(activeProject, sortBy);
		const todoListHtml = todoList(sortedTodos, activeTodo);
		const todoDetailHtml = todoDetail(activeProject, activeTodo);

		// if no project exists or no active project exists,
		if (projectListHtml === null || contentHeaderHtml === null) {
			// don't display content section
			contentHeaderDom.style.display = 'none';
			todoListDom.style.display = 'none';
			todoDetailDom.style.display = 'none';
		}

		// get project list in sidebar and make it visible
		projectListDom.innerHTML = projectListHtml;
		projectListDom.style.display = 'flex';

		// if active project exists
		if (contentHeaderHtml !== null) {
			// get content header and buttons in header, and make them visible
			contentHeaderDom.innerHTML = contentHeaderHtml;
			contentHeaderDom.style.display = 'flex';

			// add event listeners to these buttons in header
			handleAddTodo();
			handleSortByChange();
			handleToggleAllTodoCompleted();

			// if active project has any todo item
			if (todoListHtml !== null) {
				// get todos and make them visible
				todoListDom.innerHTML = todoListHtml;
				todoListDom.style.display = 'flex';

				// and if there is active todo, make it visible in detail section
				if (todoDetailHtml !== null) {
					todoDetailDom.innerHTML = todoDetailHtml;
					todoDetailDom.style.display = 'block';
				} else {
					// otherwise, make detail section invisible
					todoDetailDom.style.display = 'none';
				}
			} else {
				// if there is no todo in active project, tell the user how to add one
				todoListDom.innerHTML = `
					<h4 style="text-align: center; margin-top: 30px;">No todo yet</h4>
					<p style="text-align: center;">Click + to add todo.</p>
				`;

				// and make detail section invisible
				todoDetailDom.style.display = 'none';
			}
		}

		/* ---------- handle dynamic html element events ---------- */
		// handle project events
		handleEditProject();
		handleDeleteProject();
		handleProjectClick();

		// handle todo events
		handleEditTodo();
		handleDeleteTodo();
		handleTodoClick();
		handleToggleTodos();

		// handle checklist events
		handleAddChecklistItem();
		handleChecklistItemClick();
		handleToggleChecklistItem();
		handleDeleteChecklistItem();
	}

	/* ============== Get static html element references ============== */
	const projectListDom = document.querySelector('#project-list');
	const contentHeaderDom = document.querySelector('#content-header');
	const todoListDom = document.querySelector('#todo-list');
	const todoDetailDom = document.querySelector('#todo-detail');
	const dialogDom = document.querySelector('#form-dialog');
	const closeButton = document.querySelector('#close-dialog-btn');

	/* ======================== Initialize app ======================== */
	const app = localStorage.getItem('app')
		? rehydrateApp(JSON.parse(localStorage.getItem('app')))
		: initializeApp();
	let activeProject = app.projects[0] ?? undefined;
	let activeTodo = activeProject.todos[0] ?? undefined;
	let sortBy = 'priority';
	let sortedTodos = [];

	updateDisplay();

	/* =============== handle static html element events =============== */
	closeButton.addEventListener('click', () => {
		dialogDom.close();
	});

	// While dialog closing, remove the form in it
	dialogDom.addEventListener('close', () => {
		const form = dialogDom.querySelector('form');
		if (form !== null) {
			form.remove();
		}
		updateDisplay();
	});

	handleAddProject();
})();
