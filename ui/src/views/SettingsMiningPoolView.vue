<script setup>
import { ref, watch, computed } from 'vue'
import { watchDebounced, useTimeout, computedAsync } from '@vueuse/core'
import { useSettingsStore } from '@/stores/settings'
import { useApiStore } from '@/stores/api'
import AppHeader from '@/components/AppHeader.vue'
import AppHeaderBackLink from '@/components/AppHeaderBackLink.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const settingsStore = useSettingsStore()
const api = useApiStore()

const poolStatus = computed(() => settingsStore.pool.connected ? 'Connected' : 'Not Connected')
const username = ref(settingsStore.pool.username)
const poolUrl = ref(settingsStore.pool.url)
const miningPool = ref(settingsStore.pool.pool)

watchDebounced(username, () => {
	save()
}, { debounce: 1000 })

watchDebounced(poolUrl, () => {
	save()
}, { debounce: 1000 })

watchDebounced(miningPool, () => {
	if(miningPool.value == 'migodi') {
		poolUrl.value = 'eu.stratum.migodi.com:3333'
	} else if(miningPool.value == 'braiins') {
		poolUrl.value = 'eu.stratum.slushpool.com:3333'
	}
}, { debounce: 1000 })

async function save() {
	settingsStore.setPool(miningPool.value, username.value, poolUrl.value)
	
	api.post('settings/mining-pool', {
		user: username.value,
		url: poolUrl.value
	})
}
</script>

<template>
	<div>
		<AppHeader>
			<AppHeaderBackLink :name="$t('settings')" :linkTo="{ name: 'Settings' }" />
		</AppHeader>
		
		<div class="text-2xl mb-5 lg:text-4xl lg:mb-7">{{ $t('mining_pool') }}</div>
		
		<div class="grid grid-cols-2 gap-2 lg:gap-3 gap-y-5 lg:gap-y-7">
			<div>
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('pool_status') }}</div>
				<AppInput v-model="poolStatus" readonly />
			</div>
			<div>
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('username') }}</div>
				<AppInput v-model="username" :label="$t('username')" />
			</div>
			<div class="col-span-2">
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('mining_pool') }}</div>
				<AppSelect v-model="miningPool" :placeholder="$t('select_mining_pool')">
					<option value="migodi">MIGODI Pool</option>
					<option value="braiins">Braiins Pool</option>
					<option value="custom">{{ $t('custom_pool') }}</option>
				</AppSelect>
			</div>
			<div class="col-span-2" v-if="miningPool == 'custom'">
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('pool_url') }}</div>
				<AppInput v-model="poolUrl" title="Enter Pool URL" :label="$t('pool_url')" />
				<div class="text-xs text-primary-dark mt-2 lg:text-base ">{{ $t('for_example') }}: <span class="text-primary">stratum+tcp://stratum.slushpool.com:3333</span></div>
			</div>
		</div>
	</div>
</template>
