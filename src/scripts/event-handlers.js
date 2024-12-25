export function handleProjectClick() {
	document.querySelectorAll('.project').forEach((button) => {
		button.addEventListener('click', (event) => {
			const projectId = parseInt(event.currentTarget.dataset.projectId);
			activeProject = app.projects.find((project) => project.id === projectId);
			activeTodo = activeProject.todos[0];

			updateDisplay();
		});
	});
}

export function handleTodoClick() {
	document.querySelectorAll('.todo-list-item').forEach((item) => {
		item.addEventListener('click', (event) => {
			const todoId = parseInt(event.currentTarget.dataset.todoId);
			activeTodo = activeProject.todos.find((todo) => todo.id === todoId);

			updateDisplay();
		});
	});
}

export function handleToggleTodos() {
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

export function handleToggleChecklistItem() {
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

export function handleSortMethodChange() {
	document.querySelector('#sort-todo').addEventListener('change', (event) => {
		sortMethod = event.currentTarget.value;
		updateDisplay();
	});
}

export function handleDeleteTodo() {
	document.querySelectorAll('.delete-todo-btn').forEach((deleteBtn) => {
		deleteBtn.addEventListener('click', (event) => {
			event.stopImmediatePropagation();

			const todoId = parseInt(event.currentTarget.dataset.todoId);
			activeProject.deleteTodo(todoId);

			updateDisplay();
		});
	});
}

export function handleShowAddForm() {
	document.querySelector('#add-todo-btn').addEventListener('click', () => {
		dialogDom.showModal();

		setTimeout(() => {
			document.querySelector('#title').focus();
		}, 0);
	});
}
