<script setup>
defineProps({
	linkTo: {}
})
</script>

<template>
	<div class="primary-button relative inline-flex items-center justify-center bg-accent text-gray-40 uppercase rounded font-bold p-4 lg:text-xl lg:p-5">
		<slot></slot>
		<template v-if="linkTo">
			<RouterLink :to="linkTo" class="absolute inset-0"></RouterLink>
		</template>
	</div>
</template>
