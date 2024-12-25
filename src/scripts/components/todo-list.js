import '../../styles/todo-list.css';
import { capitalizeFirstLetter } from '../utils';

export default function todoList(todos, activeTodo) {
	const deleteIcon = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>`;

	const htmlContent = todos
		.map((todo) => {
			let todoClassNames = 'todo-list-item';
			let priorityClassNames = 'priority';
			let priorityContent = '';

			if (todo === activeTodo) {
				todoClassNames += ' active';
			}

			if (todo.completed) {
				todoClassNames += ' completed';
			}

			if (todo.priority === 0) {
				priorityClassNames += ' high';
				priorityContent = 'H';
			} else if (todo.priority === 1) {
				priorityClassNames += ' medium';
				priorityContent = 'M';
			} else {
				priorityClassNames += ' low';
				priorityContent = 'L';
			}

			return `
        <div class="${todoClassNames}" data-todo-id="${todo.id}">
        <input class="complete" type="checkbox" name="completed" id="${
					todo.id
				}" ${todo.completed ? 'checked' : ''} />

          <div>
            <span>${capitalizeFirstLetter(todo.title)}</span>
            <span class="${priorityClassNames}">${priorityContent}</span>
          </div>

          <button class="icon-btn delete-todo-btn" data-todo-id="${todo.id}">
            ${deleteIcon}
          </button>
        </div>
    `;
		})
		.join('');

	return htmlContent;
}
