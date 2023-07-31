<script setup>
import uniqueId from '@/helpers/unique-id';

const props = defineProps({
	label: {
		type: String
	},
	name: {
		type: String
	},
	disabled: {
		type: Boolean
	},
	checked: {
		type: Boolean
	},
})
const emit = defineEmits(['update:checked'])

emit('update:checked', props.checked)

const componentId = uniqueId()
</script>

<template>
	<div class="toggle relative">
		<input :id="componentId" type="checkbox" :name="name" value="1" :disabled="disabled" :checked="checked" class="" @input="!disabled ? $emit('update:checked', $event.target.checked) : null" />
		<label :for="componentId" class="flex items-center text-xs lg:text-base">{{ label }}</label>
	</div>
</template>
