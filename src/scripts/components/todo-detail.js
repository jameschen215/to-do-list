import '../../styles/todo-detail.css';
import { formatDistanceToNow } from 'date-fns';
import {
	capitalizeFirstLetter,
	DELETE_ICON,
	DOUBLE_ARROW_ICON,
} from '../utils';

export default function todoDetail(activeProject, activeTodo) {
	if (activeProject === undefined || activeTodo === undefined) {
		return null;
	}

	const sortedChecklist = activeTodo.checklist.sort((a, b) => {
		if (a.done === b.done) {
			return a.name.localeCompare(b.name);
		}

		return a.done - b.done;
	});

	const priorities = ['High', 'Medium', 'Low'];

	const headerHtml = `
    <div class="detail-header">
      <div class="breadcrumb">
        <span>My projects</span>
        <div>${DOUBLE_ARROW_ICON}</div>
        <span>${capitalizeFirstLetter(activeProject.title)}</span>
      </div>
      <button 
				class="toggle-complete-btn ${activeTodo.completed ? 'completed' : ''}"
				>
        ${activeTodo.completed ? 'Completed' : 'Mark as complete'}
      </button>
    </div>
  `;

	const checklistHtml = sortedChecklist
		.map(
			(checklistItem) => `
        <li class="checklist-item">
          <label>
            <input 
              class="done" 
              type="checkbox" 
              name="done" 
              id="${checklistItem.id}" 
              ${checklistItem.done ? 'checked' : ''} />

              <span>${checklistItem.name}</span>
          </label>
           <button 
            class="icon-btn delete-btn" 
            data-checklist-item-id="${checklistItem.id}">
            ${DELETE_ICON}
          </button>
        </li>`
		)
		.join('');

	const contentHtml = `
    <div class="detail-content ${activeTodo.completed ? 'completed' : ''}">
      <div class="detail-row detail-title">
        <h2>${capitalizeFirstLetter(activeTodo.title)}</h2>
      </div>

      <div class="detail-row detail-description">
        <h3>Description</h3>
        <p>${
					activeTodo.description !== ''
						? activeTodo.description
						: 'No description.'
				}</p>
      </div>

      <div class="detail-row detail-date">
        <h3>Due Date</h3>
        <p>${formatDistanceToNow(activeTodo.dueDate)} left.</p>
      </div>

      <div class="detail-row detail-priority">
        <h3>Priority</h3>
        <p>${priorities[activeTodo.priority] || 'Low'}</p>
      </div>

      <div class="detail-row detail-notes">
        <h3>Notes</h3>
        <p>${activeTodo.notes !== '' ? activeTodo.notes : 'No notes.'}</p>
      </div>

      <div class="detail-row detail-checklist">
        <h3>Checklist</h3>

        <ul class="checklist">
          ${activeTodo.checklist.length !== 0 ? checklistHtml : 'No checklist.'}
        </ul>
      </div>
    </div>
  `;

	return headerHtml + contentHtml;
}
