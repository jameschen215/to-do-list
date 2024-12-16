import Project from './project';
import Logger from './logger';

export default class App {
	constructor() {
		this.projects = [];
	}

	addProject(title, todos = []) {
		if (title === '') return;

		const index = this.projects.findIndex(
			(project) => project.title.toLowerCase() === title.toLowerCase()
		);

		if (index === -1) {
			this.projects.push(new Project(title));
			this.printProjects();
		} else {
			Logger.logMessage(`Project ${title} has already existed.`);
		}
	}

	editProject(id, title) {
		if (title === '') return;

		const project = this.projects.find((project) => project.id === id);

		if (project !== undefined) {
			project.editProject(title);
			this.printProjects();
		}
	}

	deleteProject(projectId) {
		const projectIndex = this.projects.findIndex(
			(item) => (item.id = projectId)
		);

		if (projectIndex !== -1) {
			this.projects = this.projects.filter((item) => item.id !== projectId);
			this.printProjects();
		}
	}

	printProjects() {
		this.projects.forEach((project) => {
			Logger.logMessage(`-------- ${project.title} --------`);

			if (project.todos.length === 0) {
				Logger.logMessage('No todo.');
			} else {
				project.todos.forEach((todo) =>
					Logger.logMessage(`${todo.title} ${todo.priority} ${todo.completed}`)
				);
			}
		});
	}
}
