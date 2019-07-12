export const environment = {
	production: false,
	languages: ['en'],
	appName: 'Hapify',
	login: {
		redirection: ['']
	},
	logout: {
		redirection: ['session', 'sign-in']
	},
	api: {
		uri: 'https://api.staging.bootstrapr.net/v1',
		adminPath: '/admin'
	},
	images: {
		uri:
			'https://images.staging.bootstrapr.net/resize?nocrop=true&url=https://bts-files-staging-4kwkkq.s3.amazonaws.com'
	}
};
