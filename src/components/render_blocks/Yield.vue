<script setup>
import { formatCurrency } from "../../utils/Formatter";
import StatTile from "./StatTile.vue";

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
			<StatTile
				:titleText="formatCurrency(data.yield) + ' ' + nativeCurrency"
				subText="Yield"
				:percentage="data.yieldInPercentage"
			/>
			<StatTile
				:titleText="formatCurrency(data.currentNetWorth) + ' ' + nativeCurrency"
				subText="Current Net Worth"
			/>
			<StatTile
				:titleText="formatCurrency(data.rewarded) + ' ' + nativeCurrency"
				subText="Earned"
				:percentage="data.earningPercentage"
			/>
			<StatTile :titleText="formatCurrency(data.deposited) + ' ' + nativeCurrency" subText="Deposited" />
			<StatTile
				:titleText="formatCurrency(data.estimatedTaxes) + ' ' + nativeCurrency"
				subText="Taxes @ withdrawal"
			/>
		</div>
	</div>
</template>
