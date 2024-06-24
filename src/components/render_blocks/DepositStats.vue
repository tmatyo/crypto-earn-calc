<script setup>
import { formatCurrency } from "../../utils/Formatter";

const props = defineProps({
	data: {
		required: true,
	},
	nativeCurrency: {
		required: true,
	},
});
</script>

<template>
	<div class="stat-data-block">
		<h2>
			Deposit stats
			<span class="cec-important">{{ formatCurrency(data.sum) }} {{ nativeCurrency }}</span>
		</h2>
		<div class="stat-container">
			<div class="stat-tile">
				<p class="data-value">{{ data.count }}</p>
				<small class="data-desc">Number of deposits</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.min) }} {{ nativeCurrency }}</p>
				<small class="data-desc">Smallest deposit</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.max) }} {{ nativeCurrency }}</p>
				<small class="data-desc">Largest deposit</small>
			</div>
			<div class="stat-tile">
				<p class="data-value">{{ formatCurrency(data.avg) }} {{ nativeCurrency }}</p>
				<small class="data-desc">Average deposit</small>
			</div>
		</div>
	</div>
</template>
