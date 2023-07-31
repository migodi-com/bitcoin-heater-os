import { reactive } from 'vue'

function generate(min, max, round) {
	const value = Math.random() * (max - min) + min
	return round ? Math.round(value) : value
}

export function stopDivergenceGenerator(divergence) {
	return clearInterval(divergence.identifier)
}

export function generateDivergence(min, max, frequence, options) {
	const divergence = reactive({
		value: 0,
		identifier: null
	})
	
	divergence.identifier = setInterval(() => divergence.value = generate(min, max, options && options.round), frequence)
	
	return divergence
}
