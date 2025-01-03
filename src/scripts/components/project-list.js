import '../../styles/project-list.css';
import { capitalizeFirstLetter, EDIT_ICON, DELETE_ICON } from '../utils';

export default function projectList(projects, activeProject) {
	if (projects.length === 0) return null;

	return projects
		.map(
			(project) => `
      <li
				class="project ${project.id === activeProject.id ? 'active' : ''}" 
				data-project-id="${project.id}">

				<div> 
					<p class="project-title">${capitalizeFirstLetter(project.title)}</p>
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
