#!/usr/bin/env node

require('dotenv').config()

const api = require('../helpers/api')
const { cache } = require('../helpers/store')

async function meter() {
	try {
		const summary = await api.unlocked().then(() => api.get('summary'))
		cache.put('miner.summary', summary.data, 60)
		const powerConsumption = await cache.get('miner.power_consumption') ?? {}
		
		let date = new Date().toISOString().substr(0, 10)
		if(!powerConsumption[date]) {
			powerConsumption[date] = 0
		}
		
		// kW/m -> kW/h
		powerConsumption[date] += summary.data.miner.power_usage / 60
		cache.put('miner.power_consumption', powerConsumption)
	} catch(e) {
		
	}
	
	process.exit(0)
}

meter()
