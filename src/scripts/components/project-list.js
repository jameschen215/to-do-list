import '../../styles/project-list.css';
import { EDIT_ICON, DELETE_ICON } from '../utils';

export default function projectList(projects, activeProject) {
	if (projects.length === 0) {
		return `
				<h4 style="text-align: center; margin-top: 30px;">No project yet</h4>
				<p style="text-align: center;">Click + to add a project.</p>
			`;
	}
	return projects
		.map(
			(project) => `
      <li
				class="project ${project.id === activeProject.id ? 'active' : ''}" 
				data-project-id="${project.id}">

				<div> 
					<p class="project-title">${project.title}</p>
					<span class="counter">${project.todos.length}</span>
				</div>
				
				<div>
					<button 
						class="icon-btn edit-btn edit-project-btn" 
						data-project-id="${project.id}">
						${EDIT_ICON}
					</button>

					<button 
						class="icon-btn delete-btn delete-project-btn" 
						data-project-id="${project.id}">
						${DELETE_ICON}
					</button>
				</div>
      </li>
    `
		)
		.join('');
}
