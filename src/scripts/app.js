import ChecklistItem from './checklist-item';
import Project from './project';
import Todo from './to-do';

export default class App {
	constructor() {
		this.todos = [];
		this.projects = [];
	}

	addProject(title) {
		// Add project
		this.projects.push(new Project(title));

		// Print to console
		this.printTodos();
	}

	deleteProject(projectId) {
		// TODO:
		// Check if project exists
		const project = this.projects.find((project) => project.id === projectId);
		if (project === undefined) return;

		// Check if the project has any todo items, if yes, you can't delete it
		// Or you delete its todo items first
		if (project.todoIds.length !== 0) {
			console.log('You cannot delete a project with todo items.');
			return;
		}

		// Do the delete action
		this.projects = this.projects.filter((project) => project.id !== projectId);

		// Print to console
		this.printTodos();
	}

	editProject(projectId, title) {
		// TODO:
		const project = this.projects.find((project) => project.id === projectId);
		if (project === undefined) return;

		// edit project's title
		project.title = title;

		// Print to console
		this.printTodos();
	}

	addTodo(todoData) {
		const { projectTitle } = todoData;
		if (projectTitle === '') return;

		const project = this.projects.find(
			(project) => project.title.toLowerCase() === projectTitle.toLowerCase()
		);

		if (project !== undefined) {
			const newTodo = new Todo({ ...todoData, projectId: project.id });
			this.todos.push(newTodo);
			project.todoIds.push(newTodo.id);
		} else {
			const newProject = new Project(projectTitle);
			const newTodo = new Todo({ ...todoData, projectId: newProject.id });
			this.todos.push(newTodo);

			newProject.todoIds.push(newTodo.id);
			this.projects.push(newProject);
		}

		this.printTodos();
	}

	deleteTodo(todoId) {
		this.todos = this.todos.filter((todo) => todo.id !== todoId);
		this.projects.forEach((project) => {
			project.todoIds = project.todoIds.filter((id) => id !== todoId);
		});

		this.printTodos();
	}

	editTodo(todoId, todoData) {
		const { projectTitle } = todoData;
		if (projectTitle === '') return;

		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo === undefined) return;

		const project = this.projects.find(
			(project) => project.title.toLowerCase() === projectTitle.toLowerCase()
		);

		if (project !== undefined) {
			todo.edit({ ...todoData, projectId: project.id });
		} else {
			const newProject = new Project(projectTitle);
			todo.edit({ ...todoData, projectId: project.id });

			newProject.todoIds.push(todo.id);
			this.projects.push(newProject);
		}

		this.printTodos();
	}

	toggleTodo(todoId) {
		const todo = this.todos.find((todo) => (todo.id = todoId));

		if (todo === undefined) return;

		if (
			todo.checklist.length === 0 ||
			todo.checklist.every((listItem) => listItem.done)
		) {
			todo.toggleCompleted();
		} else {
			console.log('You have unfinished subtask!!!');
		}

		this.printTodos();
	}

	addChecklistItem(todoId, task) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo === undefined) return;

		todo.checklist.push(new ChecklistItem(task));

		this.printTodos();
	}

	deleteChecklistItem(todoId, taskId) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo === undefined) return;

		console.log(todo);

		todo.checklist = todo.checklist.filter(
			(listItem) => listItem.id !== taskId
		);

		this.printTodos();
	}

	editChecklistItem(todoId, taskId, task) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		const taskObj = todo.checklist.find((task) => task.id === taskId);

		if (todo === undefined || taskObj === undefined) return;

		taskObj.editTask(task);

		this.printTodos();
	}

	toggleSubtask(todoId, subTaskId) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		const subTask = todo.checklist.find(
			(listItem) => listItem.id === subTaskId
		);

		if (todo === undefined || subTask === undefined) return;

		subTask.toggleDone();

		this.printTodos();
	}

	printTodos() {
		this.projects.forEach((project) => {
			console.log(project.title.toUpperCase());

			project.todoIds.forEach((todoId) => {
				this.todos.forEach((todo) => {
					if (todo.id === todoId) {
						console.log(
							`  ${todo.id}: ${todo.title} - ${todo.dueDate} - ${todo.completed}`
						);

						if (todo.checklist.length !== 0) {
							todo.checklist.forEach((listItem) => {
								console.log(
									`    Task: ${listItem.task} - Done: ${listItem.done}`
								);
							});
						}
					}
				});
			});
		});
	}
}
