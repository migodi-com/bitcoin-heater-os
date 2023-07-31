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

const monthlyBasePrice = ref(settingsStore.electricityRate.monthlyBasePrice)
const pricePerKwh = ref(settingsStore.electricityRate.pricePerKwh)
const currency = ref(settingsStore.electricityRate.currency)

watch(monthlyBasePrice, save)
watch(pricePerKwh, save)
watch(currency, save)

function save() {
	settingsStore.electricityRate.monthlyBasePrice = parseFloat(monthlyBasePrice.value)
	settingsStore.electricityRate.pricePerKwh = parseFloat(pricePerKwh.value)
	settingsStore.electricityRate.currency = currency.value
	
	api.post('settings/electricity', {
		monthly_base_price: settingsStore.electricityRate.monthlyBasePrice,
		price_per_kwh: settingsStore.electricityRate.pricePerKwh,
		currency: settingsStore.electricityRate.currency
	})
}
</script>

<template>
	<div>
		<AppHeader>
			<AppHeaderBackLink :name="$t('settings')" :linkTo="{ name: 'Settings' }" />
		</AppHeader>
		
		<div class="text-2xl mb-5 lg:text-4xl lg:mb-7">{{ $t('electricity_rate') }}</div>
		
		<div class="mb-5 grid grid-cols-2 gap-2 lg:gap-3 lg:mb-7">
			<div>
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('monthly_base_price') }} ({{ $t(currency) }})</div>
				<AppInput v-model="monthlyBasePrice" type="number" :label="$t('monthly_base_price')+' ('+$t(currency)+')'" />
			</div>
			<div>
				<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('electricity_price_per_kwh') }} (Cent)</div>
				<AppInput v-model="pricePerKwh" type="number" :label="$t('electricity_price_per_kwh')+' (Cent)'" />
			</div>
		</div>
		
		<div>
			<div class="text-xs mb-2 text-primary-dark lg:text-base">{{ $t('currency') }}</div>
			<AppSelect v-model="currency">
				<option v-for="currency in ['EUR', 'USD']" :value="currency">{{ currency }} ({{ $t(currency) }})</option>
			</AppSelect>
		</div>
	</div>
</template>
