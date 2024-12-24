import '../../styles/sidebar.css';

export default function sidebar(projects, activeProject) {
	const projectsHtml = projects
		.map(
			(project) => `
      <button class="project ${
				project === activeProject ? 'active' : ''
			}" data-project-id="${project.id}">
          <p class="project-title">${project.title}</p>
          <span class="counter">${project.todos.length}</span>
      </button>
    `
		)
		.join('');

	return `
    <button class="user">
			<div class="avatar">A</div>
			<span class="username">James</span>
		</button>

		<div class="projects-wrapper">
			<div class="project-header">
				<h3>My Projects</h3>

        <button class="icon-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
			</div>

      <div class="projects">
        ${projectsHtml}
      </div>
    </div>
  `;
}
