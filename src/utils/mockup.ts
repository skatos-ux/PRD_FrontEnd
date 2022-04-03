const mockup = {
	data: {
		tests: [
			{
				operator: {
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
				tasks: [
					{
						name: 'Vitres',
						duration: 1,
						skills: [{ name: '1' }, { name: '2' }],
					},
					{
						name: 'Pneu',
						duration: 2,
						skills: [{ name: '1' }, { name: '2' }],
					}],
				start_date: 'today',
				end_date: 'tomorrow',
			},
			{
				operator: {
					name: 'Felipe',
					skills: [{ name: '1' }, { name: '2' }],
				},
				tasks: [
					{
						name: 'Carroserie',
						duration: 1,
						skills: [{ name: '1' }, { name: '2' }],
					},
					{
						name: 'Fenetres',
						duration: 2,
						skills: [{ name: '1' }, { name: '2' }],
					}],
				start_date: 'today',
				end_date: 'tomorrow',
			},
		],
		teams: [
			[
				{
					name: 'Thomas',
					skills: [{ name: '1' }, { name: '2' }],
				},
				{
					name: 'Paul',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
			[
				{
					name: 'Felipe',
					skills: [{ name: '1' }, { name: '2' }],
				},
				{
					name: 'Théo',
					skills: [{ name: '1' }, { name: '2' }],
				},
			],
		],
		tasks: [
			{
				id: 1,
				name: 'Vitres',
				duration: 1,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 2,
				name: 'Pneu',
				duration: 2,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 3,
				name: 'Carroserie',
				duration: 1,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 4,
				name: 'Fenetres',
				duration: 2,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 5,
				name: 'Toit',
				duration: 1,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 6,
				name: 'Banquette',
				duration: 2,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 7,
				name: 'Volant',
				duration: 1,
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 8,
				name: 'Sieges',
				duration: 2,
				skills: [{ name: '1' }, { name: '2' }],
			},
		],
		skills: [
			{ id: 1, name: '1' },
			{ id: 2, name: '2' },
			{ id: 3, name: '3' },
			{ id: 4, name: '4' },
			{ id: 5, name: '5' },
			{ id: 6, name: '6' },
			{ id: 7, name: '7' }],
		members: [
			{
				id: 1,
				name: 'Thomas',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 2,
				name: 'Paul',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 3,
				name: 'Carine',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 4,
				name: 'Felipe',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 5,
				name: 'Théo',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 6,
				name: 'Blanche',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 7,
				name: 'Victor',
				skills: [{ name: '1' }, { name: '2' }],
			},
			{
				id: 8,
				name: 'Sofian',
				skills: [{ name: '1' }, { name: '2' }],
			},
		],
	},
};

export default mockup;
