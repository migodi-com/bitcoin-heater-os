module.exports = {
	apps : [
		{
			name   : "api",
			script : "./bin/api",
			cwd: "%BASEDIR%/api"
		},
		{
			name   : "www",
			script : "serve",
			env: {
				PM2_SERVE_PATH: '%BASEDIR%/ui',
				PM2_SERVE_PORT: 8080,
				PM2_SERVE_SPA: 'true',
				PM2_SERVE_HOMEPAGE: '/index.html'
			}
		},
		{
			name   : "power-consumption-meter",
			script : "./bin/power-consumption-meter.js",
			cwd: "%BASEDIR%/api",
			cron_restart: '* * * * *',
			autorestart: false
		}
	]
}
