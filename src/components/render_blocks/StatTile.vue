<script setup>
import { computed } from "vue";

const props = defineProps({
	titleText: {
		required: true,
	},
	subText: {
		required: true,
	},
	percentage: {
		required: false,
	},
});

const sobject = computed(() => ({
	"surplus-text": typeof props.percentage !== "undefined" && props.percentage * 1 > 0,
	"deficit-text": typeof props.percentage !== "undefined" && props.percentage * 1 < 0,
}));

const cobject = computed(() => ({
	surplus: typeof props.percentage !== "undefined" && props.percentage * 1 > 0,
	deficit: typeof props.percentage !== "undefined" && props.percentage * 1 < 0,
	...sobject.value,
}));
</script>

<template>
	<div class="stat-tile" :class="cobject">
		<p class="data-value">{{ titleText }}</p>
		<small class="data-desc"
			>{{ subText }} <span v-if="percentage" :class="sobject">{{ percentage }}%</span></small
		>
	</div>
</template>

<style scoped>
.deficit {
	box-shadow: inset 0px -3px 1px #ff0505;
}
.deficit-text {
	color: #ff0505;
}
.surplus {
	box-shadow: inset 0px -3px 1px #22bb33;
}
.surplus-text {
	color: #22bb33;
}
</style>
