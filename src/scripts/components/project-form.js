import '../../styles/project-form.css';
import { capitalizeFirstLetter } from '../utils';

export default function projectForm(project) {
	const form = document.createElement('form');
	form.method = 'dialog';
	form.id = 'project-form';
	form.classList.add('project-form');
	form.innerHTML = `
		<h2>
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
				autoFocus
				required
			/>
		</div>

		<div class="form-group">
			<button type="submit">Submit</button>
		</div>`;

	return form;
}
