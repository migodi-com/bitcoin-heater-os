<script setup>
import { ref, watch, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useSettingsStore } from '@/stores/settings'
import AppHeader from '@/components/AppHeader.vue'
import AppHeaderBackLink from '@/components/AppHeaderBackLink.vue'
import AppInput from '@/components/AppInput.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppToggle from '@/components/AppToggle.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const settingsStore = useSettingsStore()

const networkStatus = computed(() => settingsStore.network.connected ? 'Connected (IP: '+settingsStore.network.ip+')' : 'Not Connected')
const networkName = computed(() => settingsStore.network.connected ? settingsStore.network.name : '-')

const wifiEnabled = ref(settingsStore.network.wifiEnabled)

watch(wifiEnabled, useDebounceFn(settingsStore.toggleWifi, 1000))
</script>

<template>
	<div>
		<AppHeader>
			<AppHeaderBackLink :name="$t('settings')" :linkTo="{ name: 'Settings' }" />
		</AppHeader>
		
		<div class="mb-5 flex justify-between items-center">
			<div class="text-2xl lg:text-4xl lg:mb-7">{{ $t('network') }}</div>
			<div>
				<AppToggle name="disableWifi" v-model:checked="wifiEnabled" :label="wifiEnabled ? $t('wifi_enabled') : $t('wifi_disabled')" />
			</div>
		</div>
		
		<div class="mb-5 lg:mb-7">
			<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('network_status') }}</div>
			<AppInput v-model="networkStatus" readonly />
		</div>
		
		<div class="mb-7 lg:mb-9">
			<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('network_name') }}</div>
			<AppInput v-model="networkName" readonly />
		</div>
		
		<div>
			<AppPrimaryButton :linkTo="{ name: 'SettingsNetworkDiscover' }" class="w-full">{{ $t('connect_to_other_network') }}</AppPrimaryButton>
		</div>
	</div>
</template>
