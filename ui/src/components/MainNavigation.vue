<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import MainNavigationItem from '@/components/MainNavigationItem.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconPower from '@/components/icons/IconPower.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

const router = useRouter()
</script>

<template>
	<nav class="main-navigation relative z-10 min-h-screen w-12.5vw bg-gray-20 grow-0 shrink-0 flex flex-col lg:w-32">
		<div class="inline-flex justify-center items-center h-12.5vw lg:h-32">
			<img src="@/assets/migodi-logo.svg"  />
		</div>
		<MainNavigationItem :to="{ name: 'Dashboard' }" class="w-full flex-col justify-center h-12.5vw lg:h-32">
			<IconDashboard class="w-1/2" />
			<span class="text-xs lg:text-sm">{{ $t('dashboard') }}</span>
		</MainNavigationItem>
		<MainNavigationItem :to="{ name: 'Power' }" class="w-full flex-col justify-center h-12.5vw lg:h-32">
			<IconPower class="w-1/2" />
			<span class="text-xs lg:text-sm">{{ $t('power') }}</span>
		</MainNavigationItem>
		<MainNavigationItem :to="{ name: 'Settings' }" class="w-full flex-col justify-center h-12.5vw lg:h-32">
			<IconSettings class="w-1/2" />
			<span class="text-xs lg:text-sm">{{ $t('settings') }}</span>
		</MainNavigationItem>
		<div class="text-primary-dark/60 inline-flex items-end justify-center pb-5 text-xs mt-auto lg:text-sm">Version 1.2.0</div>
	</nav>
</template>
