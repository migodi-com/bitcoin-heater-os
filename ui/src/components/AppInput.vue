<script setup>
import AppKeyboard from "@/components/AppKeyboard.vue";
import { ref } from 'vue'

const props = defineProps({
	readonly: {},
	title: {},
	icon: {},
	type: {
		type: String
	},
	label: {},
	modelValue: {}
})
const emit = defineEmits(['update:modelValue', 'focus'])

const keyboardVisible = ref(false)
const inputElement = ref(null)
const keyboardLayout = props.type == 'number' ? 'numeric' : 'default'

function onChange(input) {
	emit('update:modelValue', input)
}

function onKeyPress(button) {
	if(button == '{downkeyboard}') {
		keyboardVisible.value = false
	}
}

function onFocus(event) {
	emit('focus', event)
	keyboardVisible.value = true
}
</script>

<template>
	<div class="relative">
		<input :type="type || 'text'" :value="modelValue" :placeholder="title" :disabled="readonly" :readonly="readonly" ref="inputElement" :class="'w-full bg-gray-20 rounded focus:outline-none focus:ring focus:ring-accent px-3 py-4 lg:text-xl lg:px-4 lg:py-5'+(icon ? ' pl-14' : '')" @focus="onFocus" @input="$emit('update:modelValue', $event.target.value)" />
		<template v-if="icon">
			<span class="absolute left-0 top-0 h-14 w-14 flex justify-center items-center pointer-events-none">
				<component :is="icon" class="w-6 h-6"></component>
			</span>
		</template>
		<AppKeyboard @change="onChange" @keyPress="onKeyPress" :inputElement="inputElement" :input="modelValue" :layout="keyboardLayout" :label="label" v-if="keyboardVisible" />
	</div>
</template>
