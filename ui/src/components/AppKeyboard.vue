<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import uniqueId from '@/helpers/unique-id';
import IconClose from '@/components/icons/IconClose.vue';

export default {
	name: 'AppKeyboard',
	props: {
		input: {},
		layout: {
			default: 'default',
			type: String
		},
		label: {
			type: String
		}
	},
	data: () => ({
		keyboard: null,
		inputElement: null,
		inputId: 'input-'+uniqueId(),
		value: null
	}),
	mounted() {
		this.value = this.input.toString()
		this.keyboard = new Keyboard(this.inputId+'-keyboard', {
			onChange: this.onChange,
			onKeyPress: this.onKeyPress,
			inputName: this.inputId,
			layout: {
				default: [
					'q w e r t z u i o p ü',
					'a s d f g h j k l ö ä',
					'{shift} y x c v b n m {bksp}',
					'{alt} / {space} . {enter}'
				],
				shift: [
					'Q W E R T Z U I O P Ü',
					'A S D F G H J K L Ö Ä',
					'{shiftactivated} Y X C V B N M {bksp}',
					'{alt} / {space} . {enter}'
				],
				alt: [
					'1 2 3 4 5 6 7 8 9 0',
					`@ # $ € & * ( ) ' "`,
					'% - + = / _ ; : ! ?',
					'{default} , {space} . {enter}'
				],
				numeric: [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'. 0 {bksp} {enter}'
				]
			},
			display: {
				'{alt}': '.?123',
				'{shift}': '⇧',
				'{shiftactivated}': '⇧',
				'{enter}': '↵',
				'{bksp}': '⌫',
				'{altright}': '.?123',
				'{downkeyboard}': '🞃',
				'{space}': ' ',
				'{default}': 'ABC',
				'{back}': '⇦'
			},
			theme: 'hg-theme-default dark',
			layoutName: this.layout
		});
		this.keyboard.setInput(this.value);
	},
	methods: {
		onChange(input) {
			this.value = input
		},
		onKeyPress(button) {
			this.$emit('keyPress', button);
			
			switch(button) {
				case '{shift}':
				case '{shiftactivated}':
					this.handleShift()
					break
				case '{alt}':
				case '{default}':
					this.handleAlt()
					break
				case '{enter}':
					this.$emit('change', this.value);
					this.$emit('keyPress', '{downkeyboard}');
				break
			}
		},
		handleShift() {
			let shiftToggle = this.keyboard.options.layoutName === 'default' ? 'shift' : 'default';
			
			this.keyboard.setOptions({
				layoutName: shiftToggle
			});
		},
		handleAlt() {
			let altToggle = this.keyboard.options.layoutName === 'default' ? 'alt' : 'default';
			
			this.keyboard.setOptions({
				layoutName: altToggle
			});
		}
	},
	watch: {
		input(input) {
			this.value = input.toString()
			this.keyboard.setInput(this.value);
		}
	},
	components: {
		IconClose
	}
};
</script>

<template>
	<div class="fixed inset-0 bg-gray-10 z-10 flex items-center justify-center">
		<div class="absolute right-8 top-8 text-xl" @click="onKeyPress('{downkeyboard}')"><IconClose class="w-6 h-6" /></div>
		<div class="w-10/12">
			<div v-if="label" class="text-center mb-6 text-2xl">{{ label }}</div>
			<input type="text" :value="value" ref="inputElement" :class="inputId+' w-full bg-gray-20 rounded focus:outline-none focus:ring focus:ring-accent px-3 py-4 lg:text-xl lg:px-4 lg:py-5 mb-4'" />
			<div :class="inputId+'-keyboard'"></div>
		</div>
	</div>
</template>
