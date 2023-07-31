<script setup>
import { useSettingsStore } from '@/stores/settings'
import { watchDebounced } from '@vueuse/core'
import { useApiStore } from '@/stores/api'
import AppHeader from '@/components/AppHeader.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const settingsStore = useSettingsStore()
const api = useApiStore()

watchDebounced(() => settingsStore.heatingLevel, () => {
	api.post('settings/heating-level', {
		heating_level: settingsStore.heatingLevel
	})
}, { debounce: 500 })
</script>

<template>
	<div>
		<AppHeader />
		
		<div class="text-2xl text-center mb-8 lg:text-4xl">{{ $t('set_heating_level') }}</div>
		<div class="flex gap-5 mb-8 lg:max-w-5xl lg:mx-auto lg:gap-6 select-none">
			<div class="flex justify-center items-center w-20 h-20 bg-accent rounded lg:w-28 lg:h-28" @click="settingsStore.decreaseHeatingLevel">
				<IconMinus class="w-12 h-12 text-gray-40 lg:w-16 lg:h-16" />
			</div>
			<div class="grow flex gap-1 lg:gap-1.5">
				<template v-for="n in (settingsStore.heatingLevel / 10)">
					<div class="h-20 bg-primary rounded grow lg:h-28"></div>
				</template>
				<template v-for="n in ((100 - settingsStore.heatingLevel) / 10)">
					<div class="h-20 bg-gray-30 rounded grow lg:h-28"></div>
				</template>
			</div>
			<div class="flex justify-center items-center w-20 h-20 bg-accent rounded lg:w-28 lg:h-28" @click="settingsStore.increaseHeatingLevel">
				<IconPlus class="w-12 h-12 text-gray-40 lg:w-16 lg:h-16" />
			</div>
		</div>
		<div class="text-4xl text-center font-bold lg:text-5xl">{{ settingsStore.heatingLevel }}%</div>
	</div>
</template>
