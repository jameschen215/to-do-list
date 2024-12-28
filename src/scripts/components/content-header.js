import '../../styles/content-header.css';
import { capitalizeFirstLetter, PLUS_ICON, SORT_ICON } from '../utils';

export default function contentHeader(activeProject) {
	const container = document.createElement('div');

	const title = document.createElement('h1');
	title.classList.add('project-title');
	title.textContent =
		activeProject !== undefined
			? capitalizeFirstLetter(activeProject.title)
			: 'No project';

	const divider1 = document.createElement('div');
	divider1.classList.add('divider');
	const divider2 = document.createElement('div');
	divider2.classList.add('divider');

	const selectContainer = document.createElement('div');
	selectContainer.classList.add('select-container');

	const selectLabel = document.createElement('label');
	selectLabel.innerHTML = SORT_ICON;
	if (activeProject === undefined) {
		selectLabel.classList.add('disabled');
	}

	const select = document.createElement('select');
	select.id = 'sort-select';
	select.disabled = activeProject === undefined;
	select.innerHTML = `
	<option value="priority">Priority</option>
		<option value="title">Title</option>
		<option value="dueDate">Due</option>`;

	const addButton = document.createElement('button');
	addButton.id = 'add-todo-btn';
	addButton.classList.add('icon-btn');
	addButton.classList.add('add-todo-btn');
	addButton.innerHTML = PLUS_ICON;
	addButton.disabled = activeProject === undefined;

	selectContainer.appendChild(selectLabel);
	selectContainer.appendChild(select);

	container.appendChild(title);
	container.appendChild(divider1);
	container.appendChild(selectContainer);
	container.appendChild(divider2);
	container.appendChild(addButton);

	return container.innerHTML;

	// return `
	//   <h1 class="project-title">${capitalizeFirstLetter(titleContent)}</h1>

	//     <div class="divider"></div>

	//       <div class="select-container">
	//         <label class="select-label" for="sort-todo">${SORT_ICON}</label>
	//         ${select}
	//       </div>

	//     <div class="divider"></div>

	//     <button id="add-todo-btn" class="icon-btn">
	//       ${PLUS_ICON}
	//     </button>
	// `;
}
