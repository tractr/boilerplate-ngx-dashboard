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
		uri: 'http://api.dev.bootstrapr.net/v1',
		// uri: 'https://api.staging.bootstrapr.net/v1',
		adminPath: '/admin'
	},
	images: {
		uri:
			'http://images.dev.bootstrapr.net/resize?nocrop=true&url=http://minio:9000/bts-files-development'
		// uri: 'https://images.staging.bootstrapr.net/resize?nocrop=true&url=https://bts-files-staging-4kwkkq.s3.amazonaws.com'
	}
};
