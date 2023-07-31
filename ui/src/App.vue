<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainNavigation from './components/MainNavigation.vue'
import AppLoading from './components/AppLoading.vue'
</script>

<template>
	<div class="flex">
		<AppLoading />
		<MainNavigation />
		<main class="grow p-5 lg:p-7">
			<RouterView />
		</main>
	</div>
</template>
