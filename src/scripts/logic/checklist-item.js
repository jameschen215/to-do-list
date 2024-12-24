let nextId = 1;

export default class ChecklistItem {
	constructor({ name, done = false }) {
		this.id = nextId++;
		this.name = name;
		this.done = done;
	}

	editItem(name) {
		this.name = name;
	}

	toggleDone() {
		this.done = !this.done;
	}
}
