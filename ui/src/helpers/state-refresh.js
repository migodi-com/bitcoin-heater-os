import axios from 'axios'
import { useApiStore } from '@/stores/api'
import { useSettingsStore } from '@/stores/settings'

let refreshInterval, settingsStore, api
let refreshRate = 5000

async function fetchSettings(app) {
	try {
		const response = await api.get('settings')
		applyState(app, response.data)
	} catch(e) {}
}

async function refreshState(app) {
	try {
		const response = await api.get('summary')
		applyState(app, response.data)
	} catch(e) {}
}

async function startRefresh(app) {
	settingsStore = useSettingsStore()
	await fetchSettings(app)
	await refreshState(app)
	refreshInterval = window.setInterval(() => refreshState(app), refreshRate)
	settingsStore.setAppIsInitialized()
}

async function applyState(app, state) {
	if(state.miner?.average_hashrate) {
		settingsStore.setHashPower(state.miner.average_hashrate)
	}
	
	if(state.miner?.power_usage) {
		settingsStore.setPowerConsumption(state.miner.power_usage)
	}
	
	if(state.miner?.pools) {
		const pool = state.miner.pools.shift()
		if(pool) {
			settingsStore.setPool(
				pool.url.includes('migodi') ? 'migodi' : (pool.url.includes('slushpool') ? 'braiins' : 'custom'),
				pool.user,
				pool.url,
				pool.status == 'active'
			)
		}
	}
	
	if(state.electricity_rate) {
		settingsStore.electricityRate.monthlyBasePrice = state.electricity_rate.monthly_base_price,
		settingsStore.electricityRate.pricePerKwh = state.electricity_rate.price_per_kwh
		settingsStore.electricityRate.currency = state.electricity_rate.currency
	}
	
	if(state.electricity_costs_month) {
		settingsStore.setElectricityCostsPerMonth(state.electricity_costs_month)
	}
	
	
	if(state.heating_level) {
		settingsStore.setHeatingLevel(state.heating_level)
	}
	
	if(state.language) {
		settingsStore.setLanguage(state.language)
		app.config.globalProperties.$i18n.locale = state.language
	}
	
	if(state.network_status) {
		settingsStore.setNetwork(state.network_status.ip, state.network_status.name, state.network_status.connected)
	}
	
	if(state.air_outlet_temperature) {
		settingsStore.setAirOutletTemperature(state.air_outlet_temperature)
	}
	
	/**
	 * Reload App
	 */
	if(state.restart_required) {
		await api.post('restarting')
		const targetLocation = new URL(location)
		targetLocation.pathname = '/'
		location.href = targetLocation.toString()
	}
}

export default {
	install: (app, options) => {
		api = useApiStore()
		startRefresh(app)
	}
}
