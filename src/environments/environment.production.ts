export const environment = {
	production: true,
	languages: ['en'],
	appName: 'Hapify',
	login: {
		redirection: ['']
	},
	logout: {
		redirection: ['session', 'sign-in']
	},
	api: {
		uri: 'https://api.bootstrapr.net/v1',
		adminPath: '/admin'
	},
	images: {
		uri:
			'https://images.bootstrapr.net/resize?nocrop=true&url=https://bts-files-production-u67438.s3.amazonaws.com'
	}
};
