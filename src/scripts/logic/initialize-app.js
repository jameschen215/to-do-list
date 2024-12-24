import App from './app';
import Project from './project';
import Todo from './to-do';
import ChecklistItem from './checklist-item';
import { INITIAL_PROJECTS } from './initial-projects';

export function initializeApp() {
	const app = new App();

	INITIAL_PROJECTS.forEach((projectData) => {
		const project = new Project(projectData.title);

		projectData.todos.forEach((todoData) => {
			const newTodo = new Todo(todoData);

			todoData.checklist.forEach((checklistItem) => {
				const newChecklistItem = new ChecklistItem(checklistItem);
				newTodo.checklist.push(newChecklistItem);
			});
			project.todos.push(newTodo);
		});

		app.projects.push(project);
	});

	app.printProjects();

	return app;
}
