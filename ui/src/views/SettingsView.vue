<script setup>
	import { useSettingsStore } from '@/stores/settings'
	import AppHeader from '@/components/AppHeader.vue'
	import ListNavigation from '@/components/ListNavigation.vue'
	import ListNavigationItem from '@/components/ListNavigationItem.vue'
	import IconWifi from '@/components/icons/IconWifi.vue'
	
	const settingsStore = useSettingsStore()
</script>

<template>
	<div>
		<AppHeader />
		
		<div class="text-2xl mb-5 lg:text-4xl lg:mb-7">{{ $t('settings') }}</div>
		<ListNavigation>
			<ListNavigationItem :title="$t('network')" :value="settingsStore.network.connected ? $t('connected') : $t('not_connected')" :to="{ name: 'SettingsNetwork' }" />
			<ListNavigationItem :title="$t('mining_pool')" :value="settingsStore.pool.connected ? $t('connected') : $t('not_connected')" :to="{ name: 'SettingsMiningPool' }" />
			<ListNavigationItem :title="$t('electricity_rate')" :value="$n(settingsStore.electricityRate.pricePerKwh, 'decimal')+' Cent/kWh'" :to="{ name: 'SettingsElectricityRate' }" />
			<ListNavigationItem :title="$t('language')" :value="$t('locale_'+$i18n.locale)" :to="{ name: 'SettingsLanguage' }" />
		</ListNavigation>
	</div>
</template>
