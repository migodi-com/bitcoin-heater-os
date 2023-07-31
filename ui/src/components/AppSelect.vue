<script setup>
defineProps({
	disabled: {},
	placeholder: {},
	modelValue: {}
})
defineEmits(['update:modelValue'])
</script>

<template>
	<div class="relative">
		<select :value="modelValue" :disabled="disabled" class="appearance-none bg-clip-padding bg-no-repeat bg-right-4 bg-arrow-drop-down w-full bg-gray-20 rounded focus:outline-none focus:ring focus:ring-accent px-3 py-4 lg:text-xl lg:px-4 lg:py-5" @input="$emit('update:modelValue', $event.target.value)">
			<template v-if="placeholder">
				<option value="" class="hidden">{{ placeholder }}</option>
			</template>
			<slot />
		</select>
	</div>
</template>
