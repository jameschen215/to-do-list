import '../styles/reset.css';
import '../styles/main.css';

import { initializeApp } from './logic/initialize-app';
import sidebar from './components/sidebar';
import contentHeader from './components/content-header';
import todoList from './components/todo-list';
import todoDetail from './components/todo-detail';
import Todo from './logic/to-do';
import Project from './logic/project';
import projectForm from './components/project-form';
import todoForm from './components/todo-form';
import { capitalizeFirstLetter } from './utils';

(function displayController() {
	/* ============== Handle project events ============== */
	// 1. Handle Adding Project
	function handleAddProject() {
		document.querySelector('#add-project-btn').addEventListener('click', () => {
			// 1.1 show form
			const form = projectForm();
			dialogDom.append(form);
			dialogDom.showModal();

			// make form control focus
			setTimeout(() => {
				document.querySelector('#project-title').focus();
			}, 0);

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

				// Make form control focus
				setTimeout(() => {
					document.querySelector('#project-title').focus();
				}, 0);

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
				document.querySelector('#title').focus();
			}, 0);

			form.addEventListener('submit', (event) => {
				event.preventDefault();

				const formData = new FormData(event.target);
				const { title, dueDate } = Object.fromEntries(formData.entries());

				// TODO: form validation

				const newTodo = new Todo(Object.fromEntries(formData.entries()));
				activeProject.todos.push(newTodo);
				activeTodo = newTodo;

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

				const todoId = parseInt(event.currentTarget.dataset.todoId);
				const todo = activeProject.todos.find((todo) => todo.id === todoId);

				if (todo === undefined) return;

				const form = todoForm(todo);
				dialogDom.appendChild(form);
				dialogDom.showModal();

				setTimeout(() => {
					document.querySelector('#title').focus();
				}, 0);

				form.addEventListener('submit', (event) => {
					event.preventDefault();

					const formData = new FormData(event.target);
					const { title, dueDate } = Object.fromEntries(formData.entries());

					// TODO: form validation

					todo.editTodo(Object.fromEntries(formData.entries()));
					activeTodo = todo;

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

				const todoId = parseInt(event.currentTarget.dataset.todoId);
				activeProject.deleteTodo(todoId);
				if (todoId === activeTodo.id) {
					activeTodo = activeProject.todos[0];
				}

				updateDisplay();
			});
		});
	}

	// 3. Handle Todo clicking
	function handleTodoClick() {
		document.querySelectorAll('.todo-list-item').forEach((item) => {
			item.addEventListener('click', (event) => {
				const todoId = parseInt(event.currentTarget.dataset.todoId);
				activeTodo = activeProject.todos.find((todo) => todo.id === todoId);

				updateDisplay();
			});
		});
	}

	function handleToggleTodos() {
		const checkboxes = document.querySelectorAll('.completed-input');
		const toggleBtn = document.querySelector('.toggle-complete-btn');

		if (checkboxes.length !== 0) {
			checkboxes.forEach((checkbox) => {
				checkbox.addEventListener('click', (event) => {
					event.stopImmediatePropagation();

					const todoId = parseInt(event.currentTarget.id);
					const todo = activeProject.todos.find((todo) => todo.id === todoId);
					todo.toggleCompleted();

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

	function handleToggleChecklistItem() {
		const checkboxes = document.querySelectorAll('.done');

		if (checkboxes.length === 0) return;

		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener('click', (event) => {
				const checklistItemId = parseInt(event.currentTarget.id);
				const checklistItem = activeTodo.checklist.find(
					(checklistItem) => checklistItem.id === checklistItemId
				);
				checklistItem.toggleDone();

				updateDisplay();
			});
		});
	}

	function handleDeleteChecklistItem() {
		document.querySelectorAll('.checklist-item button').forEach((button) => {
			button.addEventListener('click', (event) => {
				const checklistItemId = parseInt(
					event.target.closest('button').dataset.checklistItemId,
					10
				);
				if (isNaN(checklistItemId)) return;

				activeTodo.deleteChecklistItem(checklistItemId);
				updateDisplay();
			});
		});
	}

	function updateDisplay() {
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

		if (activeProject.todos.length > 0 && activeTodo === undefined) {
			activeTodo = activeProject.todos[0];
		}

		// console.table('active todo: ', activeTodo.title);

		sidebarDom.innerHTML = sidebar(app.projects, activeProject);
		contentHeaderDom.innerHTML = contentHeader(activeProject, sortBy);
		todoListDom.innerHTML = todoList(sortedTodos, activeTodo);

		if (todoDetail(activeProject, activeTodo) === null) {
			todoDetailDom.innerHTML = '';
			todoDetailDom.style.display = 'none';
		} else {
			todoDetailDom.style.display = 'block';
			todoDetailDom.innerHTML = todoDetail(activeProject, activeTodo);
		}

		// project events
		handleAddProject();
		handleEditProject();
		handleDeleteProject();
		handleProjectClick();

		// todo events
		handleAddTodo();
		handleEditTodo();
		handleDeleteTodo();
		handleTodoClick();
		handleToggleTodos();
		handleSortByChange();
		handleToggleAllTodoCompleted();

		// handleToggleChecklistItem();
		// handleDeleteChecklistItem();
	}

	const sidebarDom = document.querySelector('#sidebar');
	const contentHeaderDom = document.querySelector('#content-header');
	const todoListDom = document.querySelector('#todo-list');
	const todoDetailDom = document.querySelector('#todo-detail');
	const dialogDom = document.querySelector('#form-dialog');
	const closeButton = document.querySelector('#close-dialog-btn');

	const app = initializeApp();
	let activeProject;
	let activeTodo;
	let sortBy = 'title';
	let sortedTodos = [];

	/* =============== Handle dialog closing =============== */
	closeButton.addEventListener('click', () => {
		dialogDom.close();
	});

	// While dialog closing, remove the form in it
	dialogDom.addEventListener('close', () => {
		dialogDom.removeChild(dialogDom.lastChild);
		updateDisplay();
	});

	updateDisplay();
})();
