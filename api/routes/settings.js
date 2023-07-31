var express = require('express');
var router = express.Router();
const api = require('../helpers/api')
const { cache } = require('../helpers/store')
const { deviceState } = require('../helpers/network')

router.get('/', async function(req, res, next) {
	try {
		let summary = null
		try {
			summary = await api.unlocked().then(() => api.get('summary'))
			cache.put('miner.summary', summary.data, 60)
		} catch(e) {
			
		}
		
		const settings = await cache.get('settings') ?? {};
		
		const networkState = await deviceState(process.env.EXT_ETH_DEV)
		
		res.json({
			network_status: {
				wifi_enabled: settings.network_status?.wifi_enabled ?? true,
				ip: networkState?.address,
				name: '-'
			},
			miner: {
				pools: summary?.data?.miner?.pools
			},
			electricity_rate: {
				monthly_base_price: settings.electricity_rate?.monthly_base_price ?? 0,
				price_per_kwh: settings.electricity_rate?.price_per_kwh ?? 0,
				currency: settings.electricity_rate?.currency ?? 'EUR'
			},
			language: settings.language ?? 'en',
			heating_level: settings.heating_level ?? 100
		})
	} catch(e) {
		res.status(500).end()
	}
});

router.post('/language', async function(req, res, next) {
	const settings = await cache.get('settings') ?? {};
	if(['de', 'en'].includes(req.body.language)) {
		settings.language = req.body.language
		cache.put('settings', settings)
		res.status(200).end()
	} else {
		res.status(400).end()
	}
});

router.post('/heating-level', async function(req, res, next) {
	const settings = await cache.get('settings') ?? {};
	if(req.body.heating_level >= 0 && req.body.heating_level <= 100) {
		settings.heating_level = req.body.heating_level
		cache.put('settings', settings)
		
		let overclock = {
			preset: 'disable'
		}
		switch(settings.heating_level) {
			case 100:
				overclock.globals = {
					freq: 525,
					volt: 1260
				}
				break
			case 90:
				overclock.globals = {
					freq: 475,
					volt: 1260
				}
				break
			case 80:
				overclock.globals = {
					freq: 425,
					volt: 1260
				}
				break
			case 70:
				overclock.globals = {
					freq: 375,
					volt: 1260
				}
				break
			case 60:
				overclock.globals = {
					freq: 325,
					volt: 1260
				}
				break
			case 50:
				overclock.globals = {
					freq: 275,
					volt: 1260
				}
				break
			case 40:
				overclock.globals = {
					freq: 225,
					volt: 1260
				}
				break
			case 30:
				overclock.globals = {
					freq: 175,
					volt: 1260
				}
				break
			case 20:
				overclock.globals = {
					freq: 125,
					volt: 1260
				}
				break
			case 10:
			case 0:
				overclock.globals = {
					freq: 75,
					volt: 1260
				}
				break
		}
		
		await api.unlocked().then(() => api.post('settings', {
			miner: {
				overclock
			}
		}))
		
		/*{
			miner: {
				overclock: {
					preset: 'profile_bh_auto',
					globals: {
						freq: 0,
						volt: 0
					},
					chains: [
						{
							freq: 750,
							volt: 1900,
							disabled: false,
							chips: [
								0, 0, 0
							]
						},
						...
					]
				}
			}
		}*/
		
		res.status(200).end()
	} else {
		res.status(400).end()
	}
});

router.post('/electricity', async function(req, res, next) {
	const settings = await cache.get('settings') ?? {};
	settings.electricity_rate = {
		monthly_base_price: req.body.monthly_base_price,
		price_per_kwh: req.body.price_per_kwh,
		currency: req.body.currency
	}
	cache.put('settings', settings)
	res.status(200).end()
});

router.post('/mining-pool', async function(req, res, next) {
	try {
		await api.unlocked().then(() => api.post('settings', {
			miner: {
				pools: [
					{
						order: 0,
						pass: 'x',
						url: req.body.url,
						user: req.body.user
					},
					{
						order: 1,
						pass: '',
						url: '',
						user: ''
					},
					{
						order: 2,
						pass: '',
						url: '',
						user: ''
					}
				]
			}
		}))
		res.status(200).end()
	} catch(e) {
		res.status(500).end()
	}
});

module.exports = router;
