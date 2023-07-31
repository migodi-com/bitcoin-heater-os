<script setup>
defineProps({
	to: {}
})
</script>

<template>
	<RouterLink :to="to" class="main-navigation-item inline-flex items-center px-1 pt-1 border-l-4 border-transparent font-medium leading-5 text-primary-dark focus:outline-none transition">
		<slot></slot>
	</RouterLink>
</template>
