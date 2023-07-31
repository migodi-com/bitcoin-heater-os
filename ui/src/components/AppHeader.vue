<script setup>
import { useSettingsStore } from '@/stores/settings'
import AppTime from '@/components/AppTime.vue'
import IconWifi from '@/components/icons/IconWifi.vue'

const settingsStore = useSettingsStore()
</script>

<template>
	<div class="flex items-center justify-between mb-4">
			<div>
				<slot></slot>
			</div>
			<div class="flex items-center">
				<IconWifi class="w-6 h-6 mr-2 lg:w-8 lg:h-8 lg:mr-4" v-if="settingsStore.network.connected" />
				<AppTime />
			</div>
		</div>
</template>
