import Logger from './logger';
import Todo from './to-do.js';

let nextId = 1;

export default class Project {
	constructor(title, todos = []) {
		this.id = nextId++;
		this.title = title;
		this.todos = [];

		if (todos.length !== 0) {
			todos.forEach((todoData) => {
				this.todos.push(new Todo(todoData));
			});
		}
	}

	editProject(title) {
		this.title = title;
	}

	completeAll() {
		this.todos.forEach((todo) => (todo.completed = true));
	}

	incompleteAll() {
		this.todos.forEach((todo) => (todo.completed = false));
	}

	addItem(todoData) {
		const { title } = todoData;
		if (title === '') return;

		const index = this.todos.findIndex(
			(todo) => todo.title.toLowerCase() === title.toLowerCase()
		);

		if (index === -1) {
			const todo = new Todo(todoData);
			this.todos.push(todo);
		} else {
			Logger.logMessage(`Todo ${title} has already existed.`);
		}
	}

	editItem(id, todoData) {
		const { title } = todoData;
		if (title === '') return;

		const todo = this.todos.find((todo) => todo.id === id);
		if (todo) {
			todo.edit(todoData);
			Logger.logMessage(`${todo.id} has been updated.`);
		}
	}

	removeItem(id) {
		const todo = this.todos.find((todo) => todo.id === id);

		if (todo) {
			this.todos = this.todos.filter((item) => item.id !== id);
			Logger.logMessage(
				`${todo.title} has been removed from ${this.title} list.`
			);
		}
	}
}
