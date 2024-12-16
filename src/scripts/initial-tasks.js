const personalTodos = [
	{
		title: 'Buy groceries',
		description: 'Get essential items for the week.',
		dueDate: '2024-12-18',
		priority: 'Medium',
		notes: 'Check for discounts on snacks.',
		checklist: [
			{ task: 'Milk', done: false },
			{ task: 'Eggs', done: false },
			{ task: 'Bread', done: true },
		],
	},
	{
		title: 'Workout session',
		description: 'Go to the gym for a strength training session.',
		dueDate: '2024-12-16',
		priority: 'High',
		notes: 'Focus on upper body today.',
		checklist: [
			{ task: 'Warm-up', done: false },
			{ task: 'Bench press', done: false },
			{ task: 'Cool down', done: false },
		],
	},
];

const workTodos = [
	{
		title: 'Team meeting',
		description: 'Discuss the quarterly roadmap with the team.',
		dueDate: '2024-12-20',
		priority: 'High',
		notes: 'Prepare the slides in advance.',
		checklist: [
			{ task: 'Finalize agenda', done: true },
			{ task: 'Set up video call link', done: false },
			{ task: 'Share pre-meeting notes', done: false },
		],
	},
	{
		title: 'Code review',
		description: 'Review pull requests for the new feature implementation.',
		dueDate: '2024-12-19',
		priority: 'Medium',
		notes: 'Focus on optimization and bug fixes.',
		checklist: [
			{ task: 'Review PR #123', done: false },
			{ task: 'Add comments', done: false },
			{ task: 'Approve changes', done: false },
		],
	},
];

const travelTodos = [
	{
		title: 'Book flight tickets',
		description: 'Find affordable tickets for the trip to Vancouver.',
		dueDate: '2024-12-22',
		priority: 'High',
		notes: 'Look for early morning flights to save time.',
		checklist: [
			{ task: 'Compare prices on travel websites', done: false },
			{ task: 'Choose airline', done: false },
			{ task: 'Complete booking', done: false },
		],
	},
	{
		title: 'Pack luggage',
		description: 'Get everything ready for the trip.',
		dueDate: '2024-12-21',
		priority: 'Medium',
		notes: 'Check the weather forecast to decide what to pack.',
		checklist: [
			{ task: 'Pack clothes', done: false },
			{ task: 'Pack toiletries', done: false },
			{ task: 'Pack documents', done: false },
		],
	},
];

export const INITIAL_PROJECTS = [
	{
		title: 'personal',
		todos: personalTodos,
	},
	{
		title: 'work',
		todos: workTodos,
	},
	{
		title: 'travel',
		todos: travelTodos,
	},
];
