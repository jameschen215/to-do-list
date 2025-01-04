import '../../styles/todo-list.css';
import { DELETE_ICON, EDIT_ICON } from '../utils';

export default function todoList(todos, activeTodo) {
	if (todos.length === 0) {
		return `
			<h4 style="text-align: center; margin-top: 30px;">No todo yet</h4>
			<p style="text-align: center;">Click + to add a todo item.</p>
		`;
	}

	return todos
		.map((todo) => {
			let todoClassNames = 'todo-list-item';
			let priorityClassNames = 'priority';
			let priorityContent = '';

			if (todo.id === activeTodo.id) {
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
        <div class="${todoClassNames}" id="todo-${todo.id}">
					<input 
						class="completed-input" 
						type="checkbox" 
						id="${todo.id}" 
						${todo.completed ? 'checked' : ''} 
					/>

					<div>
						<span>${todo.title}</span>
						<span class="${priorityClassNames}">${priorityContent}</span>
					</div>
					
					<div>
						<button class="icon-btn edit-btn edit-todo-btn">
							${EDIT_ICON}
						</button>
						<button class="icon-btn delete-btn delete-todo-btn">
							${DELETE_ICON}
						</button>
					</div>
				</div>`;
		})
		.join('');
}
