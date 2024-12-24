import Project from './project';
import { formatDistanceToNow } from 'date-fns';

export default class App {
	constructor() {
		this.projects = [];
	}

	addProject(title) {
		// Add project
		this.projects.push(new Project(title));

		// Print to console
		this.printProjects();
	}

	deleteProject(projectId) {
		// Delete project
		this.projects = this.projects.filter((project) => project.id !== projectId);

		// Print to console
		this.printProjects();
	}

	editProject(projectId, title) {
		// TODO:
		const project = this.projects.find((project) => project.id === projectId);
		if (project === undefined) return;

		// edit project's title
		project.title = title;

		// Print to console
		this.printProjects();
	}

	/*
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
			todo.editTodo({ ...todoData, projectId: project.id });
		} else {
			const newProject = new Project(projectTitle);
			todo.editTodo({ ...todoData, projectId: project.id });

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

	editChecklistItem(todoId, listItemId, task) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		const listItem = todo.checklist.find((task) => task.id === listItemId);

		if (todo === undefined || listItem === undefined) return;

		listItem.editItem(task);

		this.printTodos();
	}

	toggleSubtask(todoId, listItemId) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		const listItem = todo.checklist.find(
			(listItem) => listItem.id === listItemId
		);

		if (todo === undefined || listItem === undefined) return;

		listItem.toggleDone();

		this.printTodos();
	}
*/
	printProjects() {
		this.projects.forEach((project) => {
			console.log(project.title.toUpperCase());

			project.todos.forEach((todo) => {
				console.log(
					`${todo.id} ${todo.title} ${formatDistanceToNow(todo.dueDate)} ${
						todo.completed ? '✅' : '❌'
					}`
				);

				todo.checklist.forEach((listItem) => {
					console.log(`  - ${listItem.name} ${listItem.done ? '✅' : '❌'}`);
				});
			});
		});
	}
}
