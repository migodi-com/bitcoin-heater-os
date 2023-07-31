<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import AppHeader from '@/components/AppHeader.vue'
import AppHeaderBackLink from '@/components/AppHeaderBackLink.vue'
import AppInput from '@/components/AppInput.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppCard from '@/components/AppCard.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const settingsStore = useSettingsStore()

const networkStatus = ref(settingsStore.network.connected ? 'Connected (IP: '+settingsStore.network.ip+')' : 'Not Connected')
const networkName = ref(settingsStore.network.connected ? settingsStore.network.name : '-')
</script>

<template>
	<div>
		<AppHeader>
			<AppHeaderBackLink :name="$t('network')" :linkTo="{ name: 'SettingsNetwork' }" />
		</AppHeader>
		
		<div class="text-2xl mb-5 lg:text-4xl lg:mb-7">{{ $t('connect_to_network') }}</div>
		
		<AppCard>
			...
		</AppCard>
	</div>
</template>
