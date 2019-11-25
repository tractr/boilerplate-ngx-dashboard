export const environment = {
	production: false,
	appName: 'Ngx Dashboard',
	login: {
		redirection: ['']
	},
	logout: {
		redirection: ['session', 'sign-in']
	},
	api: {
		uri: 'http://localhost:3000',
		adminPath: '/admin'
	}
};
