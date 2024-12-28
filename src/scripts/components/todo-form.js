import '../../styles/form.css';

import { format } from 'date-fns';

export default function todoForm(todo) {
	return `
    <form id="add-todo-form" class="add-todo-form hidden" method="dialog">
      <h2 class="form-title">
        ${todo === undefined ? 'Add todo' : 'Edit todo'}
      </h2>

      <div class="form-group">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value="${todo === undefined ? '' : todo.title}"
          required />
      </div>

      <div class="form-group">
        <label for="due-date" class="form-label">Due Date</label>
        <input
          type="date"
          id="due-date"
          name="dueDate"
          value="${todo === undefined ? '' : todo.dueDate}"
          required />
      </div>

      <div class="form-group">
        <label for="priority" class="form-label">Priority</label>
        <div class="custom-select">
          <select id="priority" name="priority" class="form-control" required>
            <option value="0">High</option>
            <option value="1" selected="true">Medium</option>
            <option value="2">Low</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value="${todo === undefined ? '' : todo.description}"
          rows="2"></textarea>
      </div>

      <div class="form-group">
        <label for="notes" class="form-label">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value="${todo === undefined ? '' : todo.notes}"
          rows="2"></textarea>
      </div>

      <div class="form-group">
        <button type="submit" class="submit-btn">Submit</button>
      </div>
    </form>`;
}
