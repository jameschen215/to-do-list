import App from './app';
import Project from './project';
import Todo from './to-do';
import ChecklistItem from './checklist-item';
import { INITIAL_PROJECTS } from '../initial-projects';

export function initializeApp() {
	const app = new App();

	INITIAL_PROJECTS.forEach((projectData) => {
		const project = new Project(projectData.title);

		projectData.todos.forEach((todoData) => {
			const newTodo = new Todo(todoData);

			todoData.checklist.forEach((checklistItem) => {
				const newChecklistItem = new ChecklistItem(
					checklistItem.name,
					checklistItem.done
				);
				newTodo.checklist.push(newChecklistItem);
			});
			project.todos.push(newTodo);
		});

		app.projects.push(project);
	});

	localStorage.setItem('app', JSON.stringify(app));

	return app;
}

// Function to re-instantiate an App object after deserialization
export function rehydrateApp(serializedApp) {
	const app = new App();
	app.projects = serializedApp.projects.map((projectData) => {
		const project = new Project(projectData.title);

		project.todos = projectData.todos.map((todoData) => {
			const todo = new Todo(todoData);
			todo.checklist = todoData.checklist.map((checklistItemData) => {
				return new ChecklistItem(
					checklistItemData.name,
					checklistItemData.done
				);
			});
			return todo;
		});
		return project;
	});
	return app;
}
