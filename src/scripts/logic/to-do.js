let nextId = 1;

export default class Todo {
	constructor({ title, due, priority, description = '', notes = '' }) {
		this.id = nextId++;
		this.title = title;
		this.due = new Date(due);
		this.priority = parseInt(priority, 10);
		this.description = description;
		this.notes = notes;
		this.completed = false;
		this.createdDate = new Date();
		this.checklist = [];
	}

	toggleCompleted() {
		this.completed = !this.completed;

		if (this.completed) {
			this.checklist.forEach((checklistItem) => {
				checklistItem.done = true;
			});
		} else {
			this.checklist.forEach((checklistItem) => {
				checklistItem.done = false;
			});
		}
	}

	editTodo({ title, due, priority, completed, description, notes }) {
		this.title = title;
		this.due = due;
		this.priority = parseInt(priority, 10);
		// this.projectId = projectId;
		this.completed = completed;
		this.description = description;
		this.notes = notes;
		this.updatedDate = new Date();
	}

	// addChecklistItem(name, done) {
	// 	this.checklist.push(new ChecklistItem(name, done));
	// }

	editChecklistItem(checklistItemId, name) {
		const item = this.checklist.find(
			(checklistItem) => checklistItem.id === checklistItemId
		);

		if (item !== undefined) {
			item.editItem(name);
		}
	}

	deleteChecklistItem(checklistItemId) {
		const index = this.checklist.findIndex(
			(checklistItem) => checklistItem.id === checklistItemId
		);

		if (index !== -1) {
			this.checklist = this.checklist.filter(
				(checklistItem) => checklistItem.id !== checklistItemId
			);
		}
	}
}
