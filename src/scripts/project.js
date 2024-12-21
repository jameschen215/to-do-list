let nextId = 1;

export default class Project {
	constructor(title) {
		this.id = nextId++;
		this.title = title;
		this.todoIds = [];
	}

	editTitle(title) {
		this.title = title;
	}

	makeAllTodosCompleted() {
		// TODO:
		this.todoIds;
	}

	makeAllTodosIncomplete() {
		// TODO:
	}
}
