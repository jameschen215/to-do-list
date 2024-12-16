import '../styles/reset.css';
import Project from './project';
import App from './app';
import { INITIAL_PROJECTS } from './initial-tasks';

function display() {
	const app = new App();
	const contentDom = document.querySelector('#content');

	function initializeApp() {
		INITIAL_PROJECTS.forEach(({ title, todos }) =>
			app.projects.push(new Project(title, todos))
		);
	}

	function updateDisplay() {
		contentDom.innerHTML = app.projects
			.map(
				(project) =>
					`
      <div class="project">
        <h2>${project.title}</h2>

        <div>
          ${project.todos
						.map(
							(todo) =>
								`
              <button>
							${todo.title} 0/3
              </button>
            `
						)
						.join('')}
        </div>
      </div>
      `
			)
			.join('');
	}

	initializeApp();
	updateDisplay();
}

display();
