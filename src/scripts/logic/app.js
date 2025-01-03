import Project from './project';
import { formatDistanceToNow } from 'date-fns';

export default class App {
	constructor() {
		this.projects = [];
	}

	addProject(title) {
		this.projects.push(new Project(title));
	}

	deleteProject(projectId) {
		this.projects = this.projects.filter((project) => project.id !== projectId);
	}
}
