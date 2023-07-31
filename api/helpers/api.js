const axios = require('axios')
const { cache } = require('../helpers/store')

if(!global.$apiInstance) {
	global.$apiInstance = axios.create({
		baseURL: process.env.API_URL,
		timeout: 5000
	})
	
	if(process.env.API_KEY) {
		global.$apiInstance.defaults.headers.common['X-API-KEY'] = process.env.API_KEY
		console.log('Using API Key '+process.env.API_KEY.substr(0, 5)+'...')
	} else {
		cache.get('miner.api_token').then(token => {
			if(token) {
				global.$apiInstance.defaults.headers.common['Authorization'] = 'Bearer '+token
			}
		})
	}
	
	global.$apiInstance.unlock = async function() {
		try {
			if(!process.env.API_PASS) {
				return false
			}
			const result = await global.$apiInstance.post('unlock', {
				pw: process.env.API_PASS
			})
			global.$apiInstance.defaults.headers.common['Authorization'] = 'Bearer '+result.data.token
			await cache.put('miner.api_token', result.data.token)
			console.log('Unlocked API with pass')
		} catch(e) {
			console.log('Could not unlock API')
			return false
		}
		return true
	}
	
	global.$apiInstance.unlocked = async function() {
		return new Promise(async function(resolve, reject) {
			try {
				// assume unlocked if API key is set
				if(process.env.API_KEY) {
					return resolve()
				}
				
				let unlocked = await global.$apiInstance.get('auth-check').then(() => true).catch(() => false)
				
				if(unlocked == false) {
					unlocked = await global.$apiInstance.unlock()
				}
				
				if(unlocked) {
					return resolve()
				}
			} catch(e) {}
			
			return reject()
		})
	}
}

module.exports = global.$apiInstance
