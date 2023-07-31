const http2 = require('node:http2');
const os = require('node:os');

async function deviceState(dev) {
	const interfaces = os.networkInterfaces()
	if(interfaces && interfaces[dev]) {
		return interfaces[dev].find(interface => interface.family == 'IPv4')
	}
	return null
}

async function isOnline() {
	return new Promise((resolve) => {
		const client = http2.connect('https://www.google.de');
		client.setTimeout(2000)
		client.on('connect', () => {
			resolve(true);
			client.destroy();
		});
		client.on('error', () => {
			resolve(false);
			client.destroy();
		});
		client.on('timeout', () => {
			resolve(false);
			client.destroy();
		});
	});
}

module.exports = {
	deviceState,
	isOnline
}
