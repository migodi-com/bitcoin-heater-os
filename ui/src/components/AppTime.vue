<script setup>
	import { ref, computed, unref } from 'vue'
	import { useNow } from '@vueuse/core'
	import { useI18n } from 'vue-i18n'
	
	const { d } = useI18n()
	const now = useNow()
	const time = computed(() => {
		return d(unref(now), { hour: 'numeric', minute: 'numeric' })
	})
</script>

<template>
	<div class="text-2xl lg:text-4xl">{{ time }}</div>
</template>
