<script setup>
defineProps({
	header: {},
	linkTo: {}
})
</script>

<template>
	<div class="card relative flex flex-col">
		<div class="card-header bg-gray-30 rounded-t overflow-hidden px-2.5 py-2 grow-0 shrink-0 text-xs lg:text-base lg:px-4 lg:py-5" v-if="$slots.header">
			<slot name="header"></slot>
		</div>
		<div class="card-content bg-gray-20 rounded-b overflow-hidden grow px-3 py-2 lg:px-4 lg:py-5" :class="{ 'rounded-t': !$slots.header }">
			<slot></slot>
		</div>
		<template v-if="linkTo">
			<RouterLink :to="linkTo" class="absolute inset-0"></RouterLink>
		</template>
	</div>
</template>
