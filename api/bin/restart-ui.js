#!/usr/bin/env node

require('dotenv').config()
const { cache } = require('../helpers/store')

async function run() {
	try {
		await cache.put('ui.restart_required', 1)
		
		process.exit(0)
	} catch(e) {
		console.warn('Could not issue UI restart.', e)
		process.exit(1)
	}
}

run()
