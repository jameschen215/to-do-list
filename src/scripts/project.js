import Logger from './logger';
import Todo from './to-do.js';

let nextId = 1;

export default class Project {
	constructor(name) {
		this.id = nextId++;
		this.name = name;
		this.todos = [];
	}

	edit(name) {
		this.name = name;
	}

	completeAll() {
		this.todos.forEach((todo) => (todo.completed = true));
	}

	incompleteAll() {
		this.todos.forEach((todo) => (todo.completed = false));
	}

	addItem(title, description, dueDate, priority) {
		const index = this.todos.findIndex(
			(todo) => todo.name.toLowerCase() === title.toLowerCase()
		);

		if (index === -1) {
			const todo = new Todo({
				title,
				description,
				dueDate,
				priority,
				project: this.name,
			});
			this.todos.push(todo);

			Logger.logMessage(`${todo.title} has been added to ${this.name} list.`);
		} else {
			Logger.logMessage(`Todo ${title} has already existed.`);
		}
	}

	editItem(id, title, description, dueDate, priority, completed) {
		const todo = this.todos.find((todo) => todo.id === id);

		if (todo) {
			todo.edit({ title, description, dueDate, priority, completed });

			Logger.logMessage(`${todo.title} has been updated.`);
		}
	}

	removeItem(id) {
		const todo = this.todos.find((todo) => todo.id === id);

		if (todo) {
			this.todos = this.todos.filter((item) => item.id !== id);
			Logger.logMessage(
				`${todo.title} has been removed from ${this.name} list.`
			);
		}
	}

	printTodos() {
		this.todos.forEach((todo) => {
			Logger.logMessage(
				`${todo.id} | ${todo.title} | ${todo.dueDate} | ${todo.completed}`
			);
		});
	}
}
