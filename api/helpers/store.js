const Redis = require('ioredis')

if(!global.$storeInstance) {
	global.$storeInstance = {
		redis: new Redis(),
		cache: {
			get: async function(key) {
				const result = await global.$storeInstance.redis.get(key)
				return JSON.parse(result)
			},
			put: async function(key, value, expiration) {
				if(expiration) {
					return await global.$storeInstance.redis.set(key, JSON.stringify(value), 'EX', expiration)
				} else {
					return await global.$storeInstance.redis.set(key, JSON.stringify(value))
				}
			},
			forget: async function(key) {
				return await global.$storeInstance.redis.del(key)
			}
		}
	}
}

module.exports = global.$storeInstance
