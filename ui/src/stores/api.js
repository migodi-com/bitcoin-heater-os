import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigStore } from '@/stores/config'

export const useApiStore = defineStore('api', () => {
	const config = useConfigStore()
	
	const baseUrl = new URL(config.api.baseUrl)
	return axios.create({ baseURL: baseUrl.toString() })
})
