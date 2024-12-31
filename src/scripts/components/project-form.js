import '../../styles/project-form.css';

import { capitalizeFirstLetter } from '../utils';

export default function projectForm(project) {
	const form = document.createElement('form');
	form.method = 'dialog';
	form.id = 'project-form';
	form.classList.add('project-form');
	form.innerHTML = `
	<form method="dialog" id="project-form" class="project-form">
		<h2 class="form-title">
      ${project === undefined ? 'Add Project' : 'Edit Project'}
    </h2>

		<div class="form-group">
			<input
				type="text"
				id="project-title"
				name="project-title"
				class="form-control"
				placeholder="Project Title"
        value="${
					project === undefined ? '' : capitalizeFirstLetter(project.title)
				}"
				required
			/>
		</div>

		<div class="form-group">
			<button type="submit" class="submit-btn">
				Submit
			</button>
		</div>
	</form>`;

	return form;
}
