const fs = require('node:fs/promises');
const path = require('path');
const envfile = require('envfile');

async function writeEnv(key, value) {
	const envFilePath = path.dirname(__dirname) + path.sep + '.env'
	const envFileData = await fs.readFile(envFilePath, { encoding: 'utf8' });
	
	let envData = envfile.parse(envFileData);
	envData[key] = value;
	await fs.writeFile(envFilePath, envfile.stringify(envData))
}

module.exports = writeEnv
