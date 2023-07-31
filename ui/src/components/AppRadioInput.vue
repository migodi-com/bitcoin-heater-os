<script setup>
import uniqueId from '@/helpers/unique-id';

defineProps({
	label: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	val: {
		type: String,
		required: true
	},
	modelValue: {}
})
defineEmits(['update:modelValue'])

const componentId = uniqueId()
</script>

<template>
	<div class="radio-input relative">
		<input :id="componentId" type="radio" :name="name" :value="val" :checked="modelValue == val" class="" @input="$emit('update:modelValue', $event.target.value)" />
		<label :for="componentId" class="flex items-center justify-between lg:text-xl">{{ label }}</label>
	</div>
</template>
