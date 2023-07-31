import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { generateDivergence } from '@/helpers/divergence'

export const useSettingsStore = defineStore('settings', () => {
	const appInitialized = ref(false)
	const basePowerConsumption = 0
	const baseHashPower = 0
	const maxAirOutletTemperature = 52;
	const earnedSatoshisPerMonth = 0;
	const electricityCostsPerMonth = ref(0);
	
	const heatingLevel = ref(100)
	
	const network = reactive({
		wifiEnabled: true,
		connected: false,
		ip: '',
		name: ''
	})
	
	const pool = reactive({
		connected: false,
		pool: '',
		username: '',
		url: ''
	})
	
	const electricityRate = reactive({
		monthlyBasePrice: 0,
		pricePerKwh: 0,
		currency: 'EUR'
	})
	
	const language = ref('en')
	
	const powerConsumptionDivergence = generateDivergence(-10, 10, 5000, { round: true })
	//const powerConsumption = computed(() => basePowerConsumption * heatingLevel.value / 100 + powerConsumptionDivergence.value)
	const powerConsumption = ref(0)
	
	const hashPowerDivergence = generateDivergence(-5, 5, 5000, { round: true })
	//const hashPower = computed(() => baseHashPower * heatingLevel.value / 100 + hashPowerDivergence.value)
	const hashPower = ref(0)
	
	const indoorTemperatureDivergence = generateDivergence(-1, 1, 60000, { round: true })
	//const indoorTemperature = computed(() => 21 + indoorTemperatureDivergence.value)
	const indoorTemperature = ref(0)
	
	const airOutletTemperatureDivergence = generateDivergence(-1, 1, 10000, { round: true })
	//const airOutletTemperature = computed(() => {
	//	return Math.round(indoorTemperature.value + (maxAirOutletTemperature - indoorTemperature.value) / 100 * heatingLevel.value + airOutletTemperatureDivergence.value)
	//})
	const airOutletTemperature = ref(0)
	
	function setHeatingLevel(value) {
		heatingLevel.value = value
	}
	
	function increaseHeatingLevel() {
		if(heatingLevel.value < 100) {
			heatingLevel.value += 10
		}
	}
	
	function decreaseHeatingLevel() {
		if(heatingLevel.value > 10) {
			heatingLevel.value -= 10
		}
	}
	
	function toggleWifi(enabled) {
		network.wifiEnabled = enabled
		//network.connected = enabled
	}
	
	function setNetwork(ip, name, connected) {
		network.ip = ip
		network.name = name
		network.connected = connected
	}
	
	function setPool(miningPool, username, url, connected) {
		pool.pool = miningPool
		pool.username = username
		pool.url = url
		
		if(connected !== null) {
			pool.connected = connected
		}
		//pool.connected = username && url && /^stratum\+tcp:\/\/[0-9a-z.-]+\.[a-z]{2,}:\d{2,}$/g.test(url)
	}
	
	function setLanguage(locale) {
		language.value = locale
	}
	
	function setHashPower(value) {
		hashPower.value = value
	}
	
	function setPowerConsumption(value) {
		powerConsumption.value = value
	}
	
	function setElectricityCostsPerMonth(value) {
		electricityCostsPerMonth.value = value
	}
	
	function setAirOutletTemperature(value) {
		airOutletTemperature.value = value
	}
	
	function setAppIsInitialized() {
		appInitialized.value = true
	}
	
	return {
		appInitialized,
		heatingLevel,
		network,
		pool,
		language,
		powerConsumption,
		hashPower,
		indoorTemperature,
		airOutletTemperature,
		setHeatingLevel,
		increaseHeatingLevel,
		decreaseHeatingLevel,
		toggleWifi,
		setNetwork,
		setPool,
		setLanguage,
		setHashPower,
		setPowerConsumption,
		setElectricityCostsPerMonth,
		setAirOutletTemperature,
		setAppIsInitialized,
		earnedSatoshisPerMonth,
		electricityCostsPerMonth,
		electricityRate
	}
})
