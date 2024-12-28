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

(function displayController() {
	const app = initializeApp();
	let activeProject;
	let activeTodo;
	let sortBy = 'title';
	let sortedTodos = [];

	const sidebarDom = document.querySelector('#sidebar');
	const contentHeaderDom = document.querySelector('#content-header');
	const todoListDom = document.querySelector('#todo-list');
	const todoDetailDom = document.querySelector('#todo-detail');

	// dialog and forms
	const dialogDom = document.querySelector('#form-dialog');
	const closeButton = document.querySelector('#close-dialog-btn');
	// const addProjectForm = document.querySelector('#add-project-form');
	// const addTodoFormDom = document.querySelector('#add-todo-form');

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

		if (
			activeProject !== undefined &&
			activeProject.todos.length > 0 &&
			activeTodo === undefined
		) {
			activeTodo = activeProject.todos[0];
		}

		// console.table(activeTodo);

		sidebarDom.innerHTML = sidebar(app.projects, activeProject);
		contentHeaderDom.innerHTML = contentHeader(activeProject);
		todoListDom.innerHTML = todoList(sortedTodos, activeTodo);

		if (todoDetail(activeProject, activeTodo) === null) {
			todoDetailDom.innerHTML = '';
			todoDetailDom.style.display = 'none';
		} else {
			todoDetailDom.style.display = 'block';
			todoDetailDom.innerHTML = todoDetail(activeProject, activeTodo);
		}

		handleAddProjectForm();
		handleEditProjectForm();
		handleDeleteProject();

		handleProjectClick();
		handleTodoClick();
		handleToggleTodos();
		handleToggleChecklistItem();
		handleSortByChange();
		handleDeleteTodo();
		handleShowAddForm();
		handleDeleteChecklistItem();
	}

	updateDisplay();

	/* ======================== Handle sidebar events ======================== */
	// 1. Handle Adding Project
	function handleAddProjectForm() {
		document.querySelector('#add-project-btn').addEventListener('click', () => {
			// 1.1 show form
			dialogDom.innerHTML = projectForm();
			dialogDom.showModal();

			// make form control focus
			setTimeout(() => {
				document.querySelector('#project-title').focus();
			}, 0);

			// 1.2 submit form
			document
				.querySelector('#project-form')
				.addEventListener('submit', (event) => {
					event.preventDefault();
					const formData = new FormData(event.target);
					const title = formData.get('project-title');
					// Check if the title is empty, if yes, return
					if (title === '') return;
					// Check if there is any project with the same title existed.
					const index = app.projects.findIndex(
						(project) => project.title.toLowerCase() === title.toLowerCase()
					);
					// If yes, return;
					if (index !== -1) return;
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
	function handleEditProjectForm() {
		document.querySelectorAll('.edit-project-btn').forEach((button) => {
			// 2.1 Show form
			button.addEventListener('click', (event) => {
				event.stopPropagation();

				const projectId = parseInt(event.currentTarget.dataset.projectId);
				const project = app.projects.find(
					(project) => project.id === projectId
				);

				if (project === undefined) return;

				dialogDom.innerHTML = projectForm(project);
				dialogDom.showModal();

				// Make form control focus
				setTimeout(() => {
					document.querySelector('#project-title').focus();
				}, 0);

				// 2.2 Submit form
				document
					.querySelector('#project-form')
					.addEventListener('submit', (event) => {
						event.preventDefault();
						const formData = new FormData(event.target);
						const title = formData.get('project-title');
						// Check if the title is empty, if yes, return
						if (title === '') return;
						// Check if there is any project with the same title existed.
						const index = app.projects.findIndex(
							(project) => project.title.toLowerCase() === title.toLowerCase()
						);
						// If yes, return;
						if (index !== -1) return;
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

	function handleSortByChange() {
		document
			.querySelector('#sort-select')
			.addEventListener('change', (event) => {
				sortBy = event.target.value;
				updateDisplay();
			});
	}

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

	/* ======================== Handle dialog events ======================== */
	// addTodoFormDom.addEventListener('submit', (event) => {
	// 	event.preventDefault();

	// 	const formData = new FormData(event.target);
	// 	const newTodo = new Todo(Object.fromEntries(formData.entries()));
	// 	activeTodo = newTodo;
	// 	activeProject.addTodo(newTodo);

	// 	console.table(activeTodo);

	// 	dialogDom.close();
	// 	updateDisplay();
	// });

	closeButton.addEventListener('click', () => {
		dialogDom.close();
	});

	dialogDom.addEventListener('close', () => {
		document.querySelector('#project-form').reset();
		updateDisplay();
	});

	/* Add todo event */
	function handleShowAddForm() {
		document.querySelector('#add-todo-btn').addEventListener('click', () => {
			dialogDom.showModal();
			addTodoFormDom.classList.remove('hidden');

			setTimeout(() => {
				document.querySelector('#title').focus();
			}, 0);
		});
	}
})();
