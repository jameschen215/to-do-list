let nextId = 1;

export default class Todo {
	constructor({ title, description, dueDate, priority, project }) {
		this.id = nextId++;
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.project = project;
		this.createdDate = new Date();
		this.completed = false;
	}

	edit({ title, description, dueDate, priority, completed }) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = completed;
		this.updatedDate = new Date();
	}
}
