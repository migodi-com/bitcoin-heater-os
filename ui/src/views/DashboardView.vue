<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { isLgScreen } from '@/helpers/screen'
import AppCard from '@/components/AppCard.vue'
import AppDate from '@/components/AppDate.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppGauge from '@/components/AppGauge.vue'
import IconPowerConsumption from '@/components/icons/IconPowerConsumption.vue'
import IconHashpower from '@/components/icons/IconHashpower.vue'
import IconWifi from '@/components/icons/IconWifi.vue'
import IconWifiOff from '@/components/icons/IconWifiOff.vue'
import IconPool from '@/components/icons/IconPool.vue'
import IconPoolOff from '@/components/icons/IconPoolOff.vue'
import IconHouse from '@/components/icons/IconHouse.vue'
import IconPower from '@/components/icons/IconPower.vue'
import IconTemperature from '@/components/icons/IconTemperature.vue'
import IconSatoshi from '@/components/icons/IconSatoshi.vue'
import IconElectricMeter from '@/components/icons/IconElectricMeter.vue'
import IconArrowDropDown from '@/components/icons/IconArrowDropDown.vue'
import IconArrowDropUp from '@/components/icons/IconArrowDropUp.vue'

const settingsStore = useSettingsStore()

const gaugeRadius = isLgScreen() ? 120 : 60
</script>

<template>
	<div>
		<AppHeader>
			<AppDate />
		</AppHeader>
		<div class="grid grid-cols-4 gap-3 lg:gap-4">
			<AppCard>
				<template #header>
					{{ $t('power_consumption') }}
				</template>
				
				<div class="flex items-center py-1">
					<IconPowerConsumption class="w-6 h-6 text-primary-dark mr-2 lg:w-8 lg:h-8 lg:mr-3" />
					<span class="text-2xl lg:text-4xl">{{ $n(settingsStore.powerConsumption, 'number') }} <span class="text-sm lg:text-lg">W</span></span>
				</div>
			</AppCard>
			<AppCard>
				<template #header>
					{{ $t('hash_power') }}
				</template>
				
				<div class="flex items-center py-1">
					<IconHashpower class="w-6 h-6 text-primary-dark mr-2 lg:w-8 lg:h-8 lg:mr-3" />
					<span class="text-2xl lg:text-4xl">{{ $n(settingsStore.hashPower, 'number') }} <span class="text-sm">TH/s</span></span>
				</div>
			</AppCard>
			<AppCard>
				<template #header>
					{{ $t('network_status') }}
				</template>
				
				<div class="flex items-center py-1">
					<template v-if="settingsStore.network.connected">
						<IconWifi class="w-6 h-6 text-green-10 mr-2 lg:w-8 lg:h-8 lg:mr-3" />
						<span class="text-2xl lg:text-4xl">Online</span>
					</template>
					<template v-if="!settingsStore.network.connected">
						<IconWifiOff class="w-6 text-red-10 h-6 mr-2 lg:w-8 lg:h-8 lg:mr-3" />
						<span class="text-2xl lg:text-4xl">Offline</span>
					</template>
				</div>
			</AppCard>
			<AppCard>
				<template #header>
					{{ $t('pool_status') }}
				</template>
				
				<div class="flex items-center py-1">
					<template v-if="settingsStore.network.connected && settingsStore.pool.connected">
						<IconPool class="w-6 h-6 text-green-10 mr-2 lg:w-8 lg:h-8 lg:mr-3" />
						<span class="text-2xl lg:text-4xl">Online</span>
					</template>
					<template v-if="!settingsStore.network.connected || !settingsStore.pool.connected">
						<IconPoolOff class="w-6 h-6 text-red-10 mr-2 lg:w-8 lg:h-8 lg:mr-3" />
						<span class="text-2xl lg:text-4xl">Offline</span>
					</template>
				</div>
			</AppCard>
			<AppCard class="col-span-2" v-if="false">
				<template #header>
					{{ $t('earned_satoshis_last_30_days') }}
				</template>
				
				<div class="flex items-center py-1">
					<IconSatoshi class="w-6 h-6 text-primary-dark mr-2 lg:w-8 lg:h-8 lg:mr-3" />
					<span class="text-2xl lg:text-4xl">{{ $n(settingsStore.earnedSatoshisPerMonth, 'number') }} <span class="text-sm lg:text-lg">sats</span></span>
					<IconArrowDropUp class="w-6 h-6 text-green-10 ml-auto lg:w-8 lg:h-8" />
					<span class="text-green-10 pr-2 text-xs lg:text-base">{{ $n(2.5, 'number') }}%</span>
				</div>
			</AppCard>
			<AppCard class="col-span-4">
				<template #header>
					{{ $t('electricity_costs_last_30_days') }}
				</template>
				
				<div class="flex items-center py-1">
					<IconElectricMeter class="w-6 h-6 text-primary-dark mr-2 lg:w-8 lg:h-8 lg:mr-3" />
					<span class="text-2xl lg:text-4xl">{{ $n(settingsStore.electricityCostsPerMonth, 'decimal') }} <span class="text-sm lg:text-lg">{{ $t(settingsStore.electricityRate.currency+'_symbol') }}</span></span>
					<template v-if="false">
						<IconArrowDropUp class="w-6 h-6 text-red-10 ml-auto lg:w-8 lg:h-8" />
						<span class="text-red-10 pr-2 text-xs lg:text-base">{{ $n(12.9, 'number') }}%</span>
					</template>
				</div>
			</AppCard>
			<AppCard class="col-span-2">
				<template #header>
					{{ $t('indoor_temperature') }}
				</template>
				
				<div class="flex justify-center items-center">
					<AppGauge :value="settingsStore.indoorTemperature" :min="0" :max="40" :radius="gaugeRadius" suffix="°C">
						<template #icon>
							<IconHouse class="w-12 h-12 text-primary-dark lg:w-16 lg:h-16" />
						</template>
					</AppGauge>
					<IconTemperature class="w-6 h-6 text-primary-dark -ml-5 relative left-10 top-4 lg:w-8 lg:h-8" />
				</div>
			</AppCard>
			<AppCard class="col-span-2">
				<template #header>
					{{ $t('air_outlet_temperature') }}
				</template>
				
				<div class="flex justify-center items-center">
					<AppGauge :value="settingsStore.airOutletTemperature" :min="0" :max="100" :radius="gaugeRadius" suffix="°C">
						<template #icon>
							<IconPower class="w-12 h-12 text-primary-dark lg:w-16 lg:h-16" />
						</template>
					</AppGauge>
					<IconTemperature class="w-6 h-6 text-primary-dark -ml-5 relative left-10 top-4 lg:w-8 lg:h-8" />
				</div>
			</AppCard>
		</div>
		
	</div>
</template>
