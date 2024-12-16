import ChecklistItem from './checklist-item';

let nextId = 1;

export default class Todo {
	constructor({
		title,
		dueDate,
		priority,
		description = '',
		notes = '',
		checklist = [],
	}) {
		this.id = nextId++;
		this.title = title;
		this.dueDate = dueDate;
		this.priority = priority;
		this.description = description;
		this.notes = notes;
		this.completed = false;
		this.createdDate = new Date();
		this.checklist = [];

		if (checklist.length !== 0) {
			checklist.forEach((item) => {
				const newItem = new ChecklistItem(item.task, item.done);
				this.checklist.push(newItem);
			});
		}
	}

	editTodo({ title, dueDate, priority, completed, description, notes }) {
		this.title = title;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = completed;
		this.description = description;
		this.notes = notes;
		this.updatedDate = new Date();
	}

	addChecklistItem(task, done) {
		if (task === '') return;
		this.checklist.push(ChecklistItem(task, done));
	}

	removeChecklistItem(checklistItemId) {
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
