<script setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings'
import IconLoadingRings from '@/components/icons/IconLoadingRings.vue'

const { appInitialized } = storeToRefs(useSettingsStore())
</script>

<template>
	<div class="fixed inset-0 flex justify-center items-center z-20 bg-gray-10/80" v-if="!appInitialized">
		<IconLoadingRings class="text-primary/40" />
	</div>
</template>
