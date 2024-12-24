import '../styles/reset.css';
import '../styles/main.css';

import { initializeApp } from './logic/initialize-app';

import sidebar from './components/sidebar';
import contentHeader from './components/content-header';
import todoList from './components/todo-list';
import todoDetail from './components/todo-detail';

(function displayController() {
	const app = initializeApp();

	let activeProject = app.projects[0];
	let activeTodo = activeProject.todos[0];

	const sidebarDom = document.querySelector('#sidebar');
	const contentHeaderDom = document.querySelector('#content-header');
	const todoListDom = document.querySelector('#todo-list');
	const todoDetailDom = document.querySelector('#todo-detail');

	function updateDisplay() {
		sidebarDom.innerHTML = sidebar(app.projects, activeProject);
		contentHeaderDom.innerHTML = contentHeader(activeProject.title);
		todoListDom.innerHTML = todoList(activeProject.todos, activeTodo);
		todoDetailDom.innerHTML = todoDetail(activeProject.title, activeTodo);

		handleProjectClick();
		handleTodoClick();
		handleToggleTodos();
		handleToggleChecklistItem();
	}

	updateDisplay();

	function handleProjectClick() {
		const projectButtons = document.querySelectorAll('.project');

		projectButtons.forEach((button) => {
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
		const todoItems = document.querySelectorAll('.todo-list-item');

		todoItems.forEach((item) => {
			item.addEventListener('click', (event) => {
				const todoId = parseInt(event.currentTarget.dataset.todoId);
				activeTodo = activeProject.todos.find((todo) => todo.id === todoId);

				updateDisplay();
			});
		});
	}

	function handleToggleTodos() {
		const checkboxes = document.querySelectorAll('.complete');

		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener('click', (event) => {
				event.stopImmediatePropagation();

				const todoId = parseInt(event.currentTarget.id);
				const todo = activeProject.todos.find((todo) => todo.id === todoId);
				todo.toggleCompleted();
			});
		});
	}

	function handleToggleChecklistItem() {
		const checkboxes = document.querySelectorAll('.done');

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
})();
