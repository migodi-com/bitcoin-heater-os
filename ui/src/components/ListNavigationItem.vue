<script setup>
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

defineProps({
	to: {},
	title: {},
	value: {},
})
</script>

<template>
	<RouterLink :to="to" class="list-navigation-item flex justify-between items-center bg-gray-20 rounded overflow-hidden grow p-4 lg:p-6">
		<span class="lg:text-xl">{{ title }}</span>
		<span class="inline-flex items-center">
			<span class="mr-2 text-primary-dark lg:text-xl lg:mr-4" v-if="value">{{ value }}</span>
			<IconArrowRight class="w-6 h-6 lg:w-8 lg:h-8" />
		</span>
	</RouterLink>
</template>
