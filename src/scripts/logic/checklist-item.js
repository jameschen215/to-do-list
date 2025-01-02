let nextId = 1;

export default class ChecklistItem {
	constructor(name, done = false) {
		this.id = nextId++;
		this.name = name;
		this.done = done;
		this.createdDate = new Date();
	}

	editItem(name) {
		if (name.trim() === '') return;
		this.name = name;
	}

	toggleDone() {
		this.done = !this.done;
	}
}
