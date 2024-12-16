let nextId = 1;

export default class ChecklistItem {
	constructor(task, done = false) {
		this.id = nextId++;
		this.task = task;
		this.done = done;
	}

	editTask(task) {
		this.task = task;
	}

	toggleDone() {
		this.done = !this.done;
	}
}
