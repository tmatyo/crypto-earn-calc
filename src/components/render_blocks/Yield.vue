<script setup>
import { formatCurrency } from "../../utils/Formatter";

const props = defineProps({
	data: {
		required: true,
	},
	meta: {
		required: true,
	},
	nativeCurrency: {
		required: true,
	},
});

console.log(props.data);
</script>

<template>
	<div class="stat-data-block">
		<h2>Overall</h2>
		<div class="stat-container">
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.currentNetWorth) + " " + nativeCurrency }}</p>
				<small class="data-desc">Current Net Worth</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.deposited) + " " + nativeCurrency }}</p>
				<small class="data-desc">Deposited</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.yield) + " " + nativeCurrency }}</p>
				<small class="data-desc">Yield</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.rewarded) + " " + nativeCurrency }}</p>
				<small class="data-desc">Earned</small>
			</div>
		</div>
	</div>
</template>
