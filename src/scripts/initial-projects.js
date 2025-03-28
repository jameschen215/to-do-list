const personalTodos = [
	{
		title: 'Buy groceries',
		description: 'Get essential items for the week.',
		due: '2025-1-18',
		priority: 1,
		notes: 'Check for discounts on snacks.',
		checklist: [
			{ name: 'Milk', done: false },
			{ name: 'Eggs', done: false },
			{ name: 'Bread', done: true },
		],
	},
	{
		title: 'Workout session',
		description: 'Go to the gym for a strength training session.',
		due: '2025-1-16',
		priority: 2,
		notes: 'Focus on upper body today.',
		checklist: [
			{ name: 'Warm-up', done: false },
			{ name: 'Bench press', done: false },
			{ name: 'Cool down', done: false },
		],
	},
	{
		title: 'Learning',
		description: 'Learn something new today.',
		due: '2025-1-16',
		priority: 0,
		notes: 'Focus on front end.',
		checklist: [
			{ name: 'HTML', done: false },
			{ name: 'CSS', done: false },
			{ name: 'JavaScript', done: false },
		],
	},
];

const workTodos = [
	{
		title: 'Team meeting',
		description: 'Discuss the quarterly roadmap with the team.',
		due: '2025-2-20',
		priority: 0,
		notes: 'Prepare the slides in advance.',
		checklist: [
			{ name: 'Finalize agenda', done: true },
			{ name: 'Set up video call link', done: false },
			{ name: 'Share pre-meeting notes', done: false },
		],
	},
	{
		title: 'Code review',
		description: 'Review pull requests for the new feature implementation.',
		due: '2025-1-19',
		priority: 1,
		notes: 'Focus on optimization and bug fixes.',
		checklist: [
			{ name: 'Review PR #123', done: false },
			{ name: 'Add comments', done: false },
			{ name: 'Approve changes', done: false },
		],
	},
];

const travelTodos = [
	{
		title: 'Book flight tickets',
		description: 'Find affordable tickets for the trip to Vancouver.',
		due: '2025-1-22',
		priority: 0,
		notes: 'Look for early morning flights to save time.',
		checklist: [
			{ name: 'Compare prices on travel websites', done: false },
			{ name: 'Choose airline', done: false },
			{ name: 'Complete booking', done: false },
		],
	},
	{
		title: 'Pack luggage',
		description: 'Get everything ready for the trip.',
		due: '2025-1-21',
		priority: 1,
		notes: 'Check the weather forecast to decide what to pack.',
		checklist: [
			{ name: 'Pack clothes', done: false },
			{ name: 'Pack toiletries', done: false },
			{ name: 'Pack documents', done: false },
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
