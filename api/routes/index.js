var express = require('express');
var router = express.Router();
const api = require('../helpers/api')
const { cache } = require('../helpers/store')
const { deviceState, isOnline } = require('../helpers/network')

router.get('/summary', async function(req, res, next) {
	try {
		let summary = null
		try {
			summary = await api.unlocked().then(() => api.get('summary'))
			cache.put('miner.summary', summary.data, 60)
		} catch(e) {
			
		}
		
		const settings = await cache.get('settings') ?? {};
		const restart_required = !!(await cache.get('ui.restart_required'));
		
		const networkState = await deviceState(process.env.EXT_ETH_DEV)
		const online = await isOnline()
		
		const powerConsumption = await cache.get('miner.power_consumption') ?? {}
		
		let date = new Date()
		let powerConsumptionMonth = 0
		for(let i = 30; i > 0; i--) {
			powerConsumptionMonth += powerConsumption[date.toISOString().substr(0, 10)] ?? 0
			date.setDate(date.getDate()-1)
		}
		let electricityCostsMonth = (settings.electricity_rate?.monthly_base_price ?? 0) + (settings.electricity_rate?.price_per_kwh ?? 0) * powerConsumptionMonth
		
		res.json({
			restart_required: restart_required,
			network_status: {
				wifi_enabled: settings.network_status?.wifi_enabled ?? true,
				connected: online,
				ip: networkState?.address,
				name: '-'
			},
			miner: {
				miner_status: {
					miner_state: summary?.data?.miner?.miner_status?.miner_state ?? false
				},
				average_hashrate: summary?.data?.miner?.average_hashrate,
				power_usage: summary?.data?.miner?.power_usage * 1000,
				pools: summary?.data?.miner?.pools
			},
			electricity_rate: {
				monthly_base_price: settings.electricity_rate?.monthly_base_price ?? 0,
				price_per_kwh: settings.electricity_rate?.price_per_kwh ?? 0,
				currency: settings.electricity_rate?.currency ?? 'EUR'
			},
			language: settings.language ?? 'en',
			heating_level: settings.heating_level ?? 100,
			air_outlet_temperature: Math.round(((summary?.data?.miner?.pcb_temp?.min ?? 0) + (summary?.data?.miner?.pcb_temp?.max ?? 0)) / 2),
			indoor_temperature: 0,
			earned_sats_month: 0,
			electricity_costs_month: electricityCostsMonth

		})
	} catch(e) {
		res.status(504).end()
	}
});

router.post('/restarting', async function(req, res, next) {
	await cache.forget('ui.restart_required');
	res.status(200).end()
});

module.exports = router;
