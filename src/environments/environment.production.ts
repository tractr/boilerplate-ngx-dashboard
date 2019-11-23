export const environment = {
	production: true,
	appName: 'Ngx Dashboard',
	login: {
		redirection: ['']
	},
	logout: {
		redirection: ['session', 'sign-in']
	},
	api: {
		uri: 'https://api.example.com',
		adminPath: '/admin'
	}
};
