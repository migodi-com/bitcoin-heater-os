<script setup>
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

defineProps({
	name: {},
	linkTo: {}
})
</script>
<template>
	<RouterLink :to="linkTo" class="flex text-accent lg:text-xl">
		<IconArrowLeft class="w-6 h-6 lg:w-8 lg:h-8" />
		<span>{{ name }}</span>
	</RouterLink>
</template>
