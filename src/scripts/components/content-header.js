import '../../styles/content-header.css';
import { capitalizeFirstLetter } from '../utils';

export default function contentHeader(projectTitle) {
	const sortIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>`;
	const addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

	const title = capitalizeFirstLetter(projectTitle);

	return `
    <h1 class="project-title">${title}</h1>

      <div class="divider"></div>

        <div class="select-wrapper">
          <label class="select-label" for="sort-todo">${sortIcon}</label>
          
          <select id="sort-todo" class="sort-todo-select">
            <option value="title">Title</option>
            <option value="dueDate">Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      
      <div class="divider"></div>

      <button id="add-todo-btn" class="icon-btn">
        ${addIcon}
      </button>
  `;
}
