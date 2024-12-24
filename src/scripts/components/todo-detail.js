import '../../styles/todo-detail.css';
import { formatDistanceToNow } from 'date-fns';
import { capitalizeFirstLetter } from '../utils';

export default function todoDetail(projectTitle, todo) {
	const headerHtml = `
    <div class="detail-header">
      <div class="breadcrumb">
        <span>My projects</span>
        <div>
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
            class="lucide lucide-chevrons-right">
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
          </svg>
        </div>
        <span>${capitalizeFirstLetter(projectTitle)}</span>
      </div>
      <button class="toggle-complete-btn">Mark as complete</button>
    </div>
  `;

	const checklistHtml = todo.checklist
		.map(
			(checklistItem) => `
        <li class="checklist-item">
          <input class="done" type="checkbox" name="done" id="${
						checklistItem.id
					}" ${checklistItem.done ? 'checked' : ''} />
          <label for="">${checklistItem.name}</label>
        </li>`
		)
		.join('');

	const contentHtml = `
    <div class="detail-content">
      <div class="detail-row detail-title">
        <h2>${todo.title}</h2>
      </div>

      <div class="detail-row detail-description">
        <h3>Description</h3>
        <p>${todo.description}</p>
      </div>

      <div class="detail-row detail-date">
        <h3>Due Date</h3>
        <p>${formatDistanceToNow(todo.dueDate)} left.</p>
      </div>

      <div class="detail-row detail-priority">
        <h3>Priority</h3>
        <p>${todo.priority}</p>
      </div>

      <div class="detail-row detail-notes">
        <h3>Notes</h3>
        <p>${todo.notes}</p>
      </div>

      <div class="detail-row detail-checklist">
        <h3>Checklist</h3>

        <ul class="checklist">
          ${checklistHtml}
        </ul>
      </div>
    </div>
  `;

	return headerHtml + contentHtml;
}
