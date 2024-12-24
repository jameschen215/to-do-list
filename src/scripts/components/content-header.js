import '../../styles/content-header.css';
import { capitalizeFirstLetter } from '../utils';

export default function contentHeader(projectTitle) {
	const title = capitalizeFirstLetter(projectTitle);

	return `
    <h1 class="project-title">${title}</h1>

      <div class="divider"></div>

      <div class="custom-select">
        <label for="sortBy">
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
            class="lucide lucide-arrow-down-up">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
        </label>
        <select name="sortBy" id="sortBy">
          <option value="title">Title</option>
          <option value="time">Time</option>
        </select>
      </div>

      <div class="divider"></div>

      <button class="icon-btn add-todo-btn">
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
  `;
}
