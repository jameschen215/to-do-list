import Todo from '../logic/to-do';
import { capitalizeFirstLetter } from '../utils';

let nextId = 1;

export default class Project {
	constructor(title) {
		this.id = nextId++;
		this.title = capitalizeFirstLetter(title);
		this.todos = [];
	}

	editTitle(title) {
		this.title = capitalizeFirstLetter(title);
	}

	addTodo({ title, due, priority, description = '', notes = '' }) {
		const newTodo = new Todo({
			title,
			due,
			priority,
			description,
			notes,
		});

		this.todos.push(newTodo);
	}

	deleteTodo(todoId) {
		this.todos = this.todos.filter((todo) => todo.id !== todoId);
	}

	editTodo(todoId, todoData) {
		const todo = this.todos.find((todo) => todo.id === todoId);
		if (todo === undefined) return;

		todo.editTodo(todoData);
	}

	makeAllTodosCompleted() {
		// TODO:
		this.todos.forEach((todo) => {
			todo.completed = true;

			todo.checklist.forEach((checklistItem) => {
				checklistItem.done = true;
			});
		});
	}

	makeAllTodosIncomplete() {
		// TODO:
		this.todos.forEach((todo) => {
			todo.completed = false;

			todo.checklist.forEach((checklistItem) => {
				checklistItem.done = false;
			});
		});
	}
}
