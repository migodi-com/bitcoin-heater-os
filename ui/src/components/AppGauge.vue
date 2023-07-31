<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const props = defineProps({
	radius: {},
	value: {
		default: 0
	},
	min: {
		default: 0
	},
	max: {
		default: 100
	},
	round: {
		default: true
	},
	suffix: {}
})

const cf = computed(() => 2 * Math.PI * props.radius)
const semi_cf = computed(() => cf.value / 2);

const baseValue = computed(() => {
	const v = Math.min(Math.max(props.value, props.min), props.max)
	if(props.round) {
		return Math.round(v)
	}
	return v
});

const percent = computed(() => {
	return 100 / (props.max - props.min) * (baseValue.value - props.min)
})

const strokeWidth = 32
	
const meter = ref();
const wrapper = ref();
const slider = ref();
const mask = ref();

const outlineCurves = ref();
const range = ref();
const outlineEnds = ref();

function render() {
    const meter_value = semi_cf.value - ((percent.value * semi_cf.value) / 100);
    mask.value.setAttribute('stroke-dasharray', meter_value + ',' + cf.value);
}

function prepare() {
	const circles = wrapper.value.querySelectorAll('.gauge-circle');
	for (var i = 0; i < circles.length; i++) {
	    circles[i].setAttribute('r', props.radius);
	}
	
	const meter_dimension = (props.radius * 2) + 32;
	wrapper.value.style.width = meter_dimension + 'px';
	wrapper.value.style.height = meter_dimension + 'px';
	
	outlineCurves.value.setAttribute('stroke-dasharray', semi_cf.value + ',' + cf.value);
	range.value.setAttribute('stroke-dasharray', semi_cf.value + ',' + cf.value);
	outlineEnds.value.setAttribute('stroke-dasharray', 2 + ',' + (semi_cf.value - 2));
	mask.value.setAttribute('stroke-dasharray', semi_cf.value + ',' + cf.value);
	
	render()
}

watch(() => props.value, render)
watch(() => props.radius, prepare)
watch(() => props.min, prepare)
watch(() => props.max, prepare)

onMounted(prepare)
</script>

<template>
	 <div ref="wrapper" class="gauge relative" :style="{ 'margin-bottom': (Math.round(radius * 0.4) * -1)+'px' }">
		<svg ref="meter" class="gauge-meter w-full h-full">
			<defs>
				<linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="7%" stop-color="#c7cc00"/>
					<stop offset="100%" stop-color="#c10000"/>
				</linearGradient>
			</defs>
		    <circle class="gauge-circle gauge-outline" cx="50%" cy="50%" ref="outlineCurves"></circle>
		    <circle class="gauge-circle gauge-range" cx="50%" cy="50%" stroke="url(#gauge-gradient)" ref="range"></circle>
		    <circle class="gauge-circle gauge-mask" cx="50%" cy="50%" ref="mask"></circle>
		    <circle class="gauge-circle gauge-outline" cx="50%" cy="50%" ref="outlineEnds"></circle>
		</svg>
		<div class="absolute flex items-end justify-center inset-x-0 top-0" :style="{ height: (radius + strokeWidth)+'px' }">
			<slot name="icon" />
		</div>
		<div class="absolute flex items-center justify-center py-2 inset-x-0 lg:py-5" :style="{ top: (radius + 30)+'px' }">
			<div class="text-2xl lg:text-4xl"><span v-if="baseValue == 0">NA</span><span v-if="baseValue > 0">{{ baseValue }}</span></div>
			<div class="text-sm lg:text-lg">{{ suffix }}</div>
		</div>
		<div class="absolute flex items-center left-0" :style="{ top: (radius + 20)+'px' }">
			<div class="text-xs lg:text-base">{{ min }}</div>
			<div class="text-xs lg:text-sm">{{ suffix }}</div>
		</div>
		<div class="absolute flex items-center -right-2" :style="{ top: (radius + 20)+'px' }">
			<div class="text-xs lg:text-base">{{ max }}</div>
			<div class="text-xs lg:text-sm">{{ suffix }}</div>
		</div>
	</div>
</template>

<style scoped>
.gauge-meter {
    transform: rotateX(180deg);
}
.gauge-circle {
	fill: none;
}
.gauge-outline, .gauge-mask {
    stroke: #2D2E35;
    stroke-width: 22;
}
.gauge-range {
	stroke-width: 20;
}
</style>
