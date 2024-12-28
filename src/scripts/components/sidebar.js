import '../../styles/sidebar.css';
import {
	capitalizeFirstLetter,
	PLUS_ICON,
	EDIT_ICON,
	DELETE_ICON,
} from '../utils';

export default function sidebar(projects, activeProject) {
	const projectsHtml = projects
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

	return `
    <button class="user">
			<div class="avatar">A</div>
			<span class="username">James</span>
		</button>

		<div class="projects-container">
			<div class="project-header">
				<h3>My Projects</h3>

        <button id="add-project-btn" class="icon-btn">
          ${PLUS_ICON}
        </button>
			</div>

      <ul class="projects">
        ${projectsHtml}
      </ul>
    </div>
  `;
}
