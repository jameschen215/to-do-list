import '../styles/reset.css';
import Project from './project.js';
import Logger from './logger.js';

class TodoApp {
	constructor() {
		this.projects = [];
	}

	addProject(name) {
		const index = this.projects.findIndex(
			(project) => project.name.toLowerCase() === name.toLowerCase()
		);

		if (index === -1) {
			this.projects.push(new Project(name));
			this.printProjects();
		} else {
			Logger.logMessage(`Project ${name} has already existed.`);
		}
	}

	editProject(id, name) {
		const project = this.projects.find((project) => project.id === id);

		if (project) {
			project.edit(name);
			this.printProjects();
		}
	}

	deleteProject(projectId) {
		const project = this.projects.find((item) => (item.id = projectId));

		if (project) {
			this.projects = this.projects.filter((item) => item.id !== projectId);

			Logger.logMessage(`Project ${project.name} has been removed.`);
			this.printProjects();
		}
	}

	printProjects() {
		this.projects.forEach((project) => {
			Logger.logMessage(project.name);

			if (project.todos.length === 0) {
				Logger.logMessage('No todo.');
			} else {
				project.todos.forEach((todo) => Logger.logMessage(todo.title));
			}
		});
	}
}

const app = new TodoApp();
window.app = app;
