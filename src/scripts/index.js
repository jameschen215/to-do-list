import '../styles/reset.css';
import '../styles/main.css';
import Project from './project';
import App from './app';
import { INITIAL_PROJECTS } from './initial-tasks';
import Todo from './to-do';

function display() {
	const app = new App();
	window.app = app;
	const contentDom = document.querySelector('#content');

	function initializeApp() {
		const allProjects = INITIAL_PROJECTS.map((project) => project.title);

		allProjects.forEach((title) => {
			app.projects.push(new Project(title));
		});

		INITIAL_PROJECTS.forEach((projectData) => {
			projectData.todos.forEach((todoData) => {
				const project = app.projects.find(
					(project) => project.title === projectData.title
				);

				if (project) {
					const newTodo = new Todo({ ...todoData, projectId: project.id });
					project.todoIds.push(newTodo.id);
					app.todos.push(newTodo);
				}
			});
		});

		app.printTodos();
	}

	function updateDisplay() {
		contentDom.innerHTML = app.projects
			.map(
				(project) =>
					`
					<div class="project">
						<h2>${project.title}</h2>

						<div>
							${project.todoIds
								.map((todoId) =>
									app.todos
										.map((todo) =>
											todo.id === todoId
												? `<button>${todo.title} ${todo.dueDate} ${todo.completed}</button>`
												: ''
										)
										.join('')
								)
								.join('')}
						</div>
					</div>
      		`
			)
			.join('');
	}

	initializeApp();
	// updateDisplay();
}

display();
