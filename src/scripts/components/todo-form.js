import '../../styles/todo-form.css';

import { format } from 'date-fns';

export default function todoForm(todo) {
	const form = document.createElement('form');
	form.method = 'dialog';
	form.id = 'todo-form';
	form.classList.add('todo-form');

	form.innerHTML = `
      <h2>
        ${todo === undefined ? 'Add todo' : 'Edit todo'}
      </h2>

      <div class="form-group">
        <label for="title" class="group-title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value="${todo === undefined ? '' : todo.title}"
          required />
      </div>

      <div class="form-group">
        <label class="group-title">Due Date</label>
        <div>
          <input
          type="date"
          name="due"
          value="${todo === undefined ? '' : format(todo.due, 'yyyy-MM-dd')}"
          required />
        </div>
      </div>

      <div class="form-group">
        <p class="group-title">Priority</p>

        <div>
          <label class="radio-control">
            <input 
							type="radio" 
							name="priority" 
							value="0" 
							${todo !== undefined && todo.priority === 0 ? 'checked' : ''} />
            High
          </label>

          <label class="radio-control">
            <input 
							type="radio" 
							name="priority" 
							value="1" 
							${
								(todo !== undefined && todo.priority === 1) ||
								todo === undefined
									? 'checked'
									: ''
							} />
            Medium
          </label>

          <label class="radio-control">
             <input 
							type="radio" 
							name="priority" 
							value="2" 
							${todo !== undefined && todo.priority === 2 ? 'checked' : ''} />
            Low
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="description" class="group-title">Description</label>
        <textarea
          id="description"
          name="description"
          rows="2">${todo === undefined ? '' : todo.description}</textarea>
      </div>

      <div class="form-group">
        <label for="notes" class="group-title">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="2">${todo === undefined ? '' : todo.notes}</textarea>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-btn">Submit</button>
      </div>`;

	return form;
}
