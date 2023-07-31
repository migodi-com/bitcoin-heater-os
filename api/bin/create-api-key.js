#!/usr/bin/env node

require('dotenv').config()
const { randomBytes } = require('node:crypto')
const api = require('../helpers/api')
const writeEnv = require('../helpers/write-env')

async function run() {
	try {
		if(process.env.API_KEY && !process.argv.includes('--force')) {
			console.log('API key already set.')
			process.exit(0)
		}
		
		const randomBytesBuf = await randomBytes(32)
		const apiKey = randomBytesBuf.toString('hex').substr(0, 32)
		
		await api.unlocked().then(() => api.post('apikeys', {
			key: apiKey,
			description: 'BHC'
		}))
		
		await writeEnv('API_KEY', apiKey)
		
		process.exit(0)
	} catch(e) {
		console.warn('API key could not be set.', e)
		process.exit(1)
	}
}

run()
