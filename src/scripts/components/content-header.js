import '../../styles/content-header.css';
import {
	capitalizeFirstLetter,
	PLUS_ICON,
	SORT_ICON,
	CHECK_ICON,
} from '../utils';

export default function contentHeader(activeProject, sortBy) {
	if (activeProject === undefined) return null;

	return `
	  <h1 class="project-title">${capitalizeFirstLetter(activeProject.title)}</h1>
	    
		<div class="divider"></div>

		<div class="dropdown-container">
			<div class="sort-icon">${SORT_ICON}</div>

			<button id="sort-trigger" class="trigger">
				${sortBy.toUpperCase()}
			</button>

			<div id="dropdown-sort" class="dropdown hidden">
			<button class="option" data-sort-by="priority">Priority</button>
				<button class="option" data-sort-by="title">Title</button>
				<button class="option" data-sort-by="due">Due</button>
			</div>
		</div>

		<div class="divider"></div>

		<div class="dropdown-container">
			

			<button id="check-trigger" class="trigger check-trigger icon-btn">
				<div>${CHECK_ICON}</div>
			</button>

			<div id="dropdown-check" class="dropdown hidden">
				<button class="option" value="check-all">Check all</button>
				<button class="option" value="uncheck-all">Uncheck all</button>
			</div>
		</div>
		
		<div class="divider"></div>

		<button id="add-todo-btn" class="icon-btn">
			${PLUS_ICON}
		</button>
	`;
}
