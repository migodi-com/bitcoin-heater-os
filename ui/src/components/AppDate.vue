<script setup>
	import { ref, computed, unref } from 'vue'
	import { useNow } from '@vueuse/core'
	import { useI18n } from 'vue-i18n'
	
	const { d } = useI18n()
	const now = useNow()
	const date = computed(() => {
		return d(unref(now), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
	})
</script>

<template>
	<div class="lg:text-xl">{{ date }}</div>
</template>
