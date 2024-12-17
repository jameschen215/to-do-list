import ChecklistItem from './checklist-item';

let nextId = 1;

export default class Todo {
	constructor({
		title,
		dueDate,
		priority,
		projectId,
		description = '',
		notes = '',
		checklist = [],
	}) {
		this.id = nextId++;
		this.title = title;
		this.dueDate = dueDate;
		this.priority = priority;
		this.projectId = projectId;
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

		/**
		 * console.log(this.title);
		 * this.checklist.forEach((listItem) => {
		 * console.log(`  ${listItem.task}`);
		 * });
		 * console.log('\n');
		 */
	}

	toggleCompleted() {
		this.completed = !this.completed;
	}

	edit({ title, dueDate, priority, projectId, completed, description, notes }) {
		this.title = title;
		this.dueDate = dueDate;
		this.priority = priority;
		this.projectId = projectId;
		this.completed = completed;
		this.description = description;
		this.notes = notes;
		this.updatedDate = new Date();
	}

	addChecklistItem(task, done) {
		this.checklist.push(new ChecklistItem(task, done));
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
