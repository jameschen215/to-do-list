import '../../styles/todo-list.css';
import { capitalizeFirstLetter } from '../utils';

export default function todoList(todos, activeTodo) {
	return todos
		.map(
			(todo) => `
        <div class="todo-list-item ${
					todo === activeTodo ? 'active' : ''
				}" data-todo-id="${todo.id}">
          <div>
            <input class="complete" type="checkbox" name="completed" id="${
							todo.id
						}" ${todo.completed ? 'checked' : ''} />
            <span>${capitalizeFirstLetter(todo.title)}</span>
          </div>

          <button class="icon-btn">
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
              class="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
    `
		)
		.join('');
}
