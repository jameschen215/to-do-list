export default function addForm() {
	const form = document.createElement('form');
	form.id = 'add-todo-form';
	form.classList.add('add-todo-form');

	form.innerHTML = `
    <dialog id="formDialog" class="formDialog">
      <div class="form-group">
        <label for="title" class="form-label">Title</label>
        <input type="text" id="title" name="title" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="due-date" class="form-label">Due Date</label>
        <input type="date" id="due-date" name="dueDate" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="priority" class="form-label">Priority</label>
        <select id="priority" name="priority" class="form-control" required>
          <option value="0">High</option>
          <option value="1">Medium</option>
          <option value="2">Low</option>
        </select>
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea id="description" name="description" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label for="notes" class="form-label">Notes</label>
        <textarea id="notes" name="notes" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Add Todo</button>
      </div>
    </dialog>
  `;

	return form;
}
