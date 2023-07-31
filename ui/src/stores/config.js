import { defineStore } from 'pinia'
import config from '../../config.json'

export const useConfigStore = defineStore('config', () => {
	return config
})
