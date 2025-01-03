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

	const checklistHtml = activeTodo.checklist
		.map(
			(checklistItem) => `
        <li 
          class="checklist-item ${checklistItem.name === '' ? 'active' : ''}"  
          id="checklist-item-${checklistItem.id}" >

          <input 
            type="checkbox" 
            name="done" 

            ${checklistItem.done ? 'checked' : ''} />

          <input 
            type="text" 
            value="${checklistItem.name}" 
          />


           <button class="icon-btn delete-btn">
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
        <p>${formatDistanceToNow(activeTodo.due)} left.</p>
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
          ${activeTodo.checklist.length === 0 ? '' : checklistHtml}

          <li class="checklist-item add-checklist-item-btn">
            <button>
              <div class="check-icon"></div>
              <span>
                Add a new checklist item
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `;

	return headerHtml + contentHtml;
}
