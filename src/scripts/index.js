import '../styles/reset.css';
import '../styles/main.css';

import { initializeApp } from './logic/initialize-app';
import sidebar from './components/sidebar';
import contentHeader from './components/content-header';
import todoList from './components/todo-list';
import todoDetail from './components/todo-detail';
import Todo from './logic/to-do';
import {
	handleProjectClick,
	handleTodoClick,
	handleToggleTodos,
	handleToggleChecklistItem,
	handleSortMethodChange,
	handleDeleteTodo,
	handleShowAddForm,
} from './event-handlers';

(function displayController() {
	const app = initializeApp();
	let activeProject;
	let activeTodo;
	let sortMethod = 'title';

	const sidebarDom = document.querySelector('#sidebar');
	const contentHeaderDom = document.querySelector('#content-header');
	const todoListDom = document.querySelector('#todo-list');
	const todoDetailDom = document.querySelector('#todo-detail');
	const dialogDom = document.querySelector('#form-dialog');
	const formDom = document.querySelector('#add-form');
	const closeButton = document.querySelector('#close-dialog-btn');

	function updateDisplay() {
		if (activeProject === undefined) {
			activeProject = app.projects[0];
		}

		if (activeTodo === undefined) {
			activeTodo = activeProject.todos[0];
		}

		const sortedTodos = activeProject.todos.sort((a, b) => {
			if (a.completed === b.completed) {
				if (sortMethod === 'title') {
					return a[sortMethod].localeCompare(b[sortMethod]);
				} else {
					return a[sortMethod] - b[sortMethod];
				}
			}

			return a.completed - b.completed;
		});

		sidebarDom.innerHTML = sidebar(app.projects, activeProject);
		contentHeaderDom.innerHTML = contentHeader(activeProject.title);
		todoListDom.innerHTML = todoList(sortedTodos, activeTodo);

		if (todoDetail(activeProject.title, activeTodo) === null) {
			todoDetailDom.innerHTML = '';
			todoDetailDom.style.display = 'none';
		} else {
			todoDetailDom.style.display = 'block';
			todoDetailDom.innerHTML = todoDetail(activeProject.title, activeTodo);
		}

		handleProjectClick();
		handleTodoClick();
		handleToggleTodos();
		handleToggleChecklistItem();
		handleSortMethodChange();
		handleDeleteTodo();
		handleShowAddForm();
	}

	updateDisplay();

	/* ======================== Handle dialog events ======================== */
	formDom.addEventListener('submit', (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		activeProject.addTodo(new Todo(Object.fromEntries(formData.entries())));

		dialogDom.close();
	});

	closeButton.addEventListener('click', () => {
		dialogDom.close();
	});

	dialogDom.addEventListener('close', () => {
		formDom.reset();
		updateDisplay();
	});

	/* ======================== Handle other events ======================== */
	function handleProjectClick() {
		document.querySelectorAll('.project').forEach((button) => {
			button.addEventListener('click', (event) => {
				const projectId = parseInt(event.currentTarget.dataset.projectId);
				activeProject = app.projects.find(
					(project) => project.id === projectId
				);
				activeTodo = activeProject.todos[0];

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
		const checkboxes = document.querySelectorAll('.complete');
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
				event.stopImmediatePropagation();

				const checklistItemId = parseInt(event.currentTarget.id);
				const checklistItem = activeTodo.checklist.find(
					(checklistItem) => checklistItem.id === checklistItemId
				);
				checklistItem.toggleDone();
			});
		});
	}

	function handleSortMethodChange() {
		document.querySelector('#sort-todo').addEventListener('change', (event) => {
			sortMethod = event.currentTarget.value;
			updateDisplay();
		});
	}

	function handleDeleteTodo() {
		document.querySelectorAll('.delete-todo-btn').forEach((deleteBtn) => {
			deleteBtn.addEventListener('click', (event) => {
				event.stopImmediatePropagation();

				const todoId = parseInt(event.currentTarget.dataset.todoId);
				activeProject.deleteTodo(todoId);

				updateDisplay();
			});
		});
	}

	function handleShowAddForm() {
		document.querySelector('#add-todo-btn').addEventListener('click', () => {
			dialogDom.showModal();

			setTimeout(() => {
				document.querySelector('#title').focus();
			}, 0);
		});
	}
})();
