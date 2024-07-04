<script setup>
import { formatCurrency } from "../../utils/Formatter";
import StatTile from "./StatTile.vue";

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
			<StatTile :titleText="data.count" subText="Number of deposits" />
			<StatTile :titleText="formatCurrency(data.min) + ' ' + nativeCurrency" subText="Smallest deposit" />
			<StatTile :titleText="formatCurrency(data.max) + ' ' + nativeCurrency" subText="Largest deposit" />
			<StatTile :titleText="formatCurrency(data.avg) + ' ' + nativeCurrency" subText="Average deposit" />
		</div>
	</div>
</template>
